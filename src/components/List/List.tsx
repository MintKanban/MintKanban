import React, { useState } from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from "../Card/Card";
import CardData from "../Types/CardData";
import AddCard from "../AddCard/AddCard";
import ListDropdown from "../ListDropdown/ListDropdown";
import EditListTitle from "../EditListTitle/EditListTitle";
import './list.scss'
import BCard from 'react-bootstrap/Card';

interface ListProps {
  list: CardData[],
  listName: string,
  setList: {
    addCard: (card: CardData) => void;
    editCard: (index: number, list: CardData[]) => (card: CardData) => void;
    deleteCard: (index: number, list: CardData[]) => () => void;
    deleteList: () => void;
    renameList: (newListName: string) => void;
  },
  listOrder: string[],
  index: number
}

export default function List(
  { list, listName, setList, listOrder, index}: ListProps) {

  const [duplicate, setDuplicate] = useState(false);

  return (
    <Draggable
      key={`${listName}`}
      draggableId={`${listName}`}
      index={index}
    >
      {(provided) => (
        <BCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="list-card mr-3 mb-3"
        >
          <BCard.Header>
            <div className="d-flex flex-row justify-content-between align-items-baseline">
              <EditListTitle
                listName={listName}
                listOrder={listOrder}
                duplicate={duplicate}
                setDuplicate={setDuplicate}
                renameList={setList.renameList}
              />
              <ListDropdown
                listName={listName}
                deleteList={setList.deleteList}
                />
            </div>
            <BCard
              border={duplicate ? 'danger' : '0'}
              className={duplicate ? 'mt-2' : 'm-0'}
            >
              <BCard.Text>
                <span className="d-flex flex-row justify-content-center align-items-baseline">
                  { duplicate ? 'That list already exists' : ''}
                </span>
              </BCard.Text>
            </BCard>
          </BCard.Header>
          <Droppable droppableId={`${listName}`} type="CARD">
            {(provided, snapshot) => (
              <BCard.Body ref={provided.innerRef}>
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
                <AddCard addCard={setList.addCard}/>
              </BCard.Body>
            )}
          </Droppable>
        </BCard>
      )}
    </Draggable>
  );
}
