import React, {useState} from "react";
import { Droppable } from 'react-beautiful-dnd';
import Card from "../Card/Card";
import CardData from "../Types/CardData";
import AddCard from "../AddCard/AddCard";

interface ListProps {
  list: CardData[]
  listName: string
  setList: {
    add: (card: CardData) => void;
    edit: (index: number, list: CardData[]) => (card: CardData) => void;
    delete: (index: number, list: CardData[]) => () => void;
  }
}

export default function List({ list, listName, setList }: ListProps) {
  const [editable, setEditable] = useState(true)

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
  });


  
  return (
    <>
      <div 
        className = 'listname'
        contentEditable={editable} 
        onClick={() => { setEditable(true) }} 
        onKeyDown={(e: any) => { if (e.keyCode === 13) setEditable(false)}}>
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
                    card={card}
                    idx={idx}
                    list={list}
                    listName={listName}
                    setList={setList}
                  />
                ))
              }
              
              <AddCard addCard={setList.add}/>

              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </>
  );
}
