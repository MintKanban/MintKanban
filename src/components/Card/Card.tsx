import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardData from '../Types/CardData';
import EditCard from '../EditCard/EditCard';
import BCard from 'react-bootstrap/Card';

interface CardProps {
  id: string,
  card: CardData,
  idx: number,
  list: CardData[],
  listName: string,
  listOrder: string[],
  moveCardToList: (to: string) => void
  setList: {
    addCard: (card: CardData) => void;
    editCard: (index: number, list: CardData[]) => (card: CardData) => void;
    deleteCard: (index: number, list: CardData[]) => () => void;
    deleteList: () => void;
    renameList: (newListName: string) => void;
  },
  isTourExample: boolean,
  editModalTour: boolean,
}

export default function Card(
  {
    id, card, idx, list, listName, setList, moveCardToList, listOrder,
    isTourExample, editModalTour
  }: CardProps) {
  
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isTourExample && editModalTour) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isTourExample, editModalTour]);

  if (isTourExample){
    console.log('show:', show);
    console.log('editModalTour:', editModalTour);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EditCard
        id={isTourExample ? 'seventh-step' : ''}
        card={ card }
        editCard={ setList.editCard(idx, list) }
        deleteCard={ setList.deleteCard(idx, list) }
        handleClose={ handleClose }
        show={ show }
        listName={ listName }
        listOrder={ listOrder }
        moveCardToList={ moveCardToList }
      />
      <Draggable
        draggableId={`${listName}-${idx}`}
        index={idx}
      >
        {(provided, snapshot) => (
            <BCard
              id={id}
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
