import React, { useEffect, useState } from 'react';
import '../../styles/index.scss';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';
import List from '../List/List';
import AddList from '../AddList/AddList';
import CardData from '../Types/CardData';
import TourComponent from '../Tour/TourComponent';
import { Dropdown, DropdownButton } from "react-bootstrap";
import { BoardNav } from "../NavBar/NavBar";
import Load from "../File/Load";
import Save from "../File/Save";

function Board() {
  const [lists, setLists] = useState<Record<string, CardData[]>>({
    todo: [new CardData("first"), new CardData("second")],
    inProgress: [new CardData("finish hackathon")],
    done: [new CardData(":P")]
  });
  const [listOrder, setListOrder] = useState(Object.keys(lists));

  function loadList(serializedList: string) {
    const { lists, listOrder } = JSON.parse(serializedList);
    setLists(lists);
    setListOrder(listOrder);
  }

  useEffect(() => {
    const savedList = localStorage.getItem("tmrw-kanban");
    if (savedList) {
      loadList(savedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tmrw-kanban", JSON.stringify({ lists, listOrder }));
  }, [lists, listOrder]);

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
        const listsCopy = { ...lists };
        delete listsCopy[listName];
        setLists(listsCopy);

        const listOrderCopy = [...listOrder];
        listOrderCopy.splice(listOrder.indexOf(listName), 1)
        setListOrder(listOrderCopy);
      },
      renameList: (newListName: string) => {
        const listsCopy = { ...lists };
        delete listsCopy[listName];
        listsCopy[newListName] = lists[listName];
        setLists(listsCopy);

        const listOrderCopy = [...listOrder];
        listOrderCopy.splice(listOrder.indexOf(listName), 1, newListName);
        setListOrder(listOrderCopy);
      }
    }
  }
  
  const moveCardToList = (from: string) => (index: number) => (to: string) => {
    if (from === to) return;
    const source = [...lists[from]];
    const card = source.splice(index, 1);
    const target = [...lists[to], ...card];
    setLists({
      ...lists,
      [from]: source,
      [to]: target
    })
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
    <>
      <BoardNav>
        <DropdownButton id="dropdown-menu-button" title="Menu" variant="secondary" alignRight>
          <Load loadList={loadList}>
            <Dropdown.Item>
              Load
            </Dropdown.Item>
          </Load>
          <Save data={{lists, listOrder}}>
            <Dropdown.Item>
              Save
            </Dropdown.Item>
          </Save>
        </DropdownButton>
      </BoardNav>
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
              <main id="eigth-step"
                ref={provided.innerRef}
                className="d-flex align-items-start flex-row overflow-auto p-3 mt-3">
                {
                  listOrder.map((listName, idx) => {
                    return (
                      <List key={listName}
                        index={idx}
                        list={lists[listName]}
                        listName={listName}
                        setList={setList(listName)}
                        listOrder={listOrder}
                        moveCardToList={moveCardToList(listName)}
                      />
                    );
                  })
                }
                {provided.placeholder}
                <AddList
                  lists={lists}
                  setLists={setLists}
                  listOrder={listOrder}
                  setListOrder={setListOrder}
                />
              </main>
            )}
          </Droppable>
        </DragDropContext>

        <TourComponent/>
      </div>
    </>
  );
}

export default Board;
