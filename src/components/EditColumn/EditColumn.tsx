import React, { useState } from 'react';
import CardData from '../Types/CardData';

interface EditColumnTitleProps {
  card: CardData,
  editColumnTitle: (card: CardData) => void
}

export default function EditColumnTitle(
  { card, editColumnTitle }: EditColumnTitleProps) {
  const [title, setTitle] = useState(card.title);

  const updateTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    editColumnTitle(new CardData(title));
  }

  return (
    <>
      <div>
        <form onSubmit={updateTitle}>
          <input type="text"
            placeholder={'Insert a listname'}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </form>
      </div>
    </>
  );
}