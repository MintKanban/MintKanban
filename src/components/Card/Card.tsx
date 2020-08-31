import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardData from '../Types/CardData';
import EditCard from '../EditCard/EditCard';
import BCard from 'react-bootstrap/Card';

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
  },
  tour: boolean
}

export default function Card(
  { card, idx, list, listName, setList, tour, }: CardProps) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EditCard
        card={ card }
        editCard={ setList.editCard(idx, list) }
        deleteCard={ setList.deleteCard(idx, list) }
        handleClose={ handleClose }
        show={ show }
        tour={ tour }
      />
      <Draggable
        draggableId={`${listName}-${idx}`}
        index={idx}
      >
        {(provided, snapshot) => (
          <BCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleShow}
            className="mb-3"
            bg={snapshot.isDragging ? "light" : ""}
          >
            <BCard.Body>
              <BCard.Text>
                {card.title}
              </BCard.Text>
            </BCard.Body>
          </BCard>
        )}
      </Draggable>
    </>
  );
}
