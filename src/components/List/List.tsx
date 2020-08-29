import React from "react";
import { Droppable, DragDropContext, Draggable, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import Card from "../Types/Card";


interface ListProps {
  list: Card[],
  listName: string
}

export default function List({ list, listName }: ListProps) {

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
  });

  return (
    <>
      <h2>{listName}</h2>
      <Droppable droppableId={`${listName}`} type="CARD">
        {
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {
                list.map((item, idx) => (
                  <Draggable
                    key={`${listName}-${idx}`}
                    draggableId={`${listName}-${idx}`}
                    index={idx}
                  >
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
    </>
  );
}

