import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CardData from '../Types/CardData';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface EditCardProps {
  card: CardData
  editCard: (card: CardData) => void
  deleteCard: () => void
  handleClose: () => void
  show: boolean,
  moveCardToList: (to: string) => void,
  listOrder: string[],
  listName: string
}

export default function EditCard(
  { card, editCard, deleteCard, handleClose, show, moveCardToList, listOrder, listName }: EditCardProps) {

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description)
  const [moveTo, setMoveTo] = useState(listName)

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    editCard(new CardData(title, description));
    moveCardToList(moveTo);
    handleClose();
  }
  
  const remove = () => {
    deleteCard();
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"
                          placeholder={'Insert a task'}
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                          value={description}
                          onChange={e => setDescription(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="in-list">
            <Form.Label>Move To</Form.Label>
            <Form.Control as="select" value={ moveTo } onChange={ e => setMoveTo(e.target.value) }>
              { listOrder.map(list => <option key={ list }>{ list }</option>)}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={save}>Save Changes</Button>
        <Button variant="danger" onClick={remove}>Delete</Button>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
