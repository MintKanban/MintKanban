import React, { useState } from 'react';
import logo from './mintbean.png';
import './styles/index.scss';
import { Droppable, DragDropContext, Draggable, DropResult, DraggableLocation } from 'react-beautiful-dnd';

class Card {
  name: string = "(TODO)"
  constructor(name: string) {
    this.name = name;
  }
}

// class Title {
//   title: string = "()"
//   constructor(title: string) {
//     this.title = title;
//   } 
// }

function App() {
  // const [items, setItems] = useState([
  //   {name: 'First', column: 'Todo'},
  //   {name: 'Second', column: 'Todo'}
  // ]);

  const [lists, setLists] = useState<Record<string, Card[]>>({
    todo: [new Card("first"), new Card("second")],
    done: [new Card(":P")]
  });

  // React.MouseEvent<HTMLDivElement, MouseEvent>
  const addList = (listName: string) => {
    setLists({ ...lists, [listName]: [] });
  }
  // const [title, setTitle] = useState<Record<string, Card[]>>({
  //   title: new Title(title)
  // });

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
  // might change this
  const getListStyle = (isDraggingOver: boolean) => ({
      background: isDraggingOver ? 'lightblue' : 'lightgrey',
      padding: 8,
      width: 250
  });
  
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
        <h2>Todo</h2>
        <Droppable droppableId="todo" type="CARD">
          {
            (provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {
                  lists['todo'].map((item, idx) => (
                    <Draggable draggableId={`todo-${idx}`} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={
                            {userSelect: 'none',
                            padding: 16,
                            margin: `0 0 16px 0`,

                            // change background colour if dragging
                            background: snapshot.isDragging ? 'lightgreen' : 'grey',

                            // styles we need to apply on draggables
                            ...provided.draggableProps.style}
                          }
                        >
                          <h4>{item.name}</h4>
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        
        <h2>Done</h2>
        <Droppable droppableId="done" type="CARD">
          {
            (provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {
                  lists['done'].map((item, idx) => (
                    <Draggable draggableId={`done-${idx}`} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={
                            {userSelect: 'none',
                            padding: 16,
                            margin: `0 0 16px 0`,

                            // change background colour if dragging
                            background: snapshot.isDragging ? 'lightgreen' : 'grey',

                            // styles we need to apply on draggables
                            ...provided.draggableProps.style}
                          }
                        >
                          <h4>{item.name}</h4>
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>

        {/* <div onClick={listInput}>
          <div
            style={{
              display: "inline-block"
            }}
          >
            + Add a new list
          </div>
        </div> */}
      </DragDropContext>
    </div>
  );
}

export default App;
