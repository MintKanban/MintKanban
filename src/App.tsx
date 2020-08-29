import React, { useState } from 'react';
import './styles/index.scss';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import List from './components/List/List';
import Card from './components/Types/Card';
import AddList from './components/AddList/AddList';



function App() {
  const [lists, setLists] = useState<Record<string, Card[]>>({
    todo: [new Card("first"), new Card("second")],
    inProgress: [new Card("finish hackathon")],
    done: [new Card(":P")]
  });


  function setCard(listName: string) {
    return (card: Card) => {
      setLists({
        ...lists,
        [listName]: [...lists[listName], card]
      });
    }
  }

  const [listOrder, setListOrder] = useState(['todo', 'inProgress', 'done']);

  const move = (
    source: Card[], destination: Card[],
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
    droppableId: string, startIndex: number, endIndex: number
  ) => {
    const result = Array.from(lists[droppableId]);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setLists({
      ...lists,
      [droppableId]: result
    })
  };
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      reorder(
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
    <div className="App" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }}>
      <DragDropContext
        onDragEnd={onDragEnd}
      > 
        {
          listOrder.map(listName => {
            return (
              <List key={listName} list={lists[listName]} listName={listName} setCard={setCard(listName)} />
            );
          })
        }

        { 
          <AddList
            lists={lists}
            setLists={setLists}
            listOrder={listOrder}
            setListOrder={setListOrder}
          />
        }
      </DragDropContext>
    </div>
  );
}

export default App;
