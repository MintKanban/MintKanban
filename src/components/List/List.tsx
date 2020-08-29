import React, {useState} from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from "../Card/Card";
import CardData from "../Types/CardData";
import AddCard from "../AddCard/AddCard";

interface ListProps {
  list: CardData[],
  listName: string,
  setList: {
    add: (card: CardData) => void;
    edit: (index: number, list: CardData[]) => (card: CardData) => void;
    delete: (index: number, list: CardData[]) => () => void;
  },
  index: number
}

export default function List({ list, listName, setList, index }: ListProps) {
  const [editable, setEditable] = useState(true)
  
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
  });
  
  return (
    <Draggable
      key={`${listName}`}
      draggableId={`${listName}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            marginRight: "10px",

            // change background colour if dragging
            background: snapshot.isDragging ? 'lightgreen' : 'grey',
            
            // styles we need to apply on draggables
            ...provided.draggableProps.style
          }}
        >
          <div 
            contentEditable={editable} 
            onKeyDown={ (e: any) => {if (e.keyCode === 13) setEditable(false)}}
            onClick={() => {setEditable(true)}}
            >
              {listName}
              </div>
          <Droppable droppableId={`${listName}`} type="CARD">
            {
              (provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {
                    list.map((card, idx) => (
                      <Card
                        key={idx}
                        card={card}
                        idx={idx}
                        list={list}
                        listName={listName}
                        setList={setList}
                      />
                    ))
                  }
                  {provided.placeholder}
                  <AddCard addCard={setList.add}/>
                </div>
              )
            }
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
