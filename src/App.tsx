import React, { useState } from 'react';
import './styles/index.scss';
import { DragDropContext, DropResult, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import List from './components/List/List';
import AddList from './components/AddList/AddList';
import CardData from './components/Types/CardData';

function App() {
  const [lists, setLists] = useState<Record<string, CardData[]>>({
    todo: [new CardData("first"), new CardData("second")],
    inProgress: [new CardData("finish hackathon")],
    done: [new CardData(":P")]
  });
  const [listOrder, setListOrder] = useState(['todo', 'inProgress', 'done']);
  
  function setList(listName: string) {
    return {
      addCard: (card: CardData) => {
        setLists({
          ...lists,
          [listName]: [...lists[listName], card]
        });
      },
      editCard: (index: number, list: CardData[]) => (card: CardData) => {
        const listCopy = [...list];
        listCopy.splice(index, 1, card);
        setLists({
          ...lists,
          [listName]: listCopy
        });
      },
      deleteCard: (index: number, list: CardData[]) => () => {
        const listCopy = [...list];
        listCopy.splice(index, 1);
        setLists({
          ...lists,
          [listName]: listCopy
        });
      },
      deleteList: () => {
        const listsCopy = {...lists};
        delete listsCopy[listName];
        setLists(listsCopy);

        const listOrderCopy = [...listOrder];
        listOrderCopy.splice(listOrder.indexOf(listName), 1)
        setListOrder(listOrderCopy);
      },
      renameList: (newListName: string) => {
        const listsCopy = {...lists};
        delete listsCopy[listName];
        listsCopy[newListName] = lists[listName];
        setLists(listsCopy);

        const listOrderCopy = [...listOrder];
        listOrderCopy.splice(listOrder.indexOf(listName), 1, newListName);
        setListOrder(listOrderCopy);
      }
    }
  }


  const move = (
    source: CardData[], destination: CardData[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = { ...lists };
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    setLists(result)
  };

  const reorder = (
    type: string, droppableId: string, startIndex: number, endIndex: number
  ) => {
    if (type === 'LIST') {
      const result = Array.from(listOrder);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      setListOrder(result)
    } else if (type === 'CARD') {
      const result = Array.from(lists[droppableId]);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      setLists({
        ...lists,
        [droppableId]: result
      })
    }
  };
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { type, source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      reorder(
        type,
        source.droppableId,
        source.index,
        destination.index
      );
    } else {
      move(
        lists[source.droppableId],
        lists[destination.droppableId],
        source,
        destination
      );
    }
  }
  
  return (
    <div>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="main-droppable"
          direction="horizontal"
          type="LIST"
        >
          {(provided) => (
            <main ref={provided.innerRef} className="d-flex align-items-start flex-row overflow-auto">
              {
                listOrder.map(listName => {
                  return (
                    <List key={listName}
                      list={lists[listName]}
                      listName={listName}
                      setList={setList(listName)}
                      index={listOrder.indexOf(listName)}
                    />
                  );
                })
              }

              {provided.placeholder}
            </main>
          )}
        </Droppable>

        <AddList
          lists={lists}
          setLists={setLists}
          listOrder={listOrder}
          setListOrder={setListOrder}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
