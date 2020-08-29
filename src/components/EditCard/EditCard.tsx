import React, { useState } from 'react';
import CardData from '../Types/CardData';

interface EditCardProps {
  card: CardData,
  editCard: (card: CardData) => void,
  deleteCard: () => void,
  closeModal: () => void
}

export default function EditCard(
  { card, editCard, deleteCard, closeModal }: EditCardProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description)

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    editCard(new CardData(title, description));
    closeModal();
  }
  
  const remove = () => {
    deleteCard();
    closeModal();
  }

  return (
    <>
      <div>
        <form >
          <input type="text"
            placeholder={'Insert a task'}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <h2>Description</h2>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}>
          </textarea>

          <button onClick={save}>Save Changes</button>
          <button onClick={remove}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </>
  );
}