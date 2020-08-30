import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardData from '../Types/CardData';
import EditCard from '../EditCard/EditCard';

interface CardProps {
  card: CardData,
  idx: number,
  list: CardData[],
  listName: string,
  setList: {
    addCard: (card: CardData) => void;
    editCard: (index: number, list: CardData[]) => (card: CardData) => void;
    deleteCard: (index: number, list: CardData[]) => () => void;
    deleteList: () => void;
    renameList: (newListName: string) => void;
  }
}

export default function Card({card, idx, list, listName, setList}: CardProps) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EditCard
        card={card}
        editCard={ setList.editCard(idx, list) }
        deleteCard={ setList.deleteCard(idx, list) }
        handleClose={ handleClose }
        show={ show }
      />
      <Draggable
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
            onClick={handleShow}
          >
            <h4>{card.title}</h4>
            {/* <div className="delete-card"
              onClick={ () => { setList.delete(idx, list) }}
            >
              delete icon
            </div> */}
          </div>
        )}
      </Draggable>
    </>
  );
}
