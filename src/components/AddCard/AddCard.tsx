import React, { useState } from 'react';
import CardData from '../Types/CardData';

interface AddCardProps {
    addCard: (card: CardData) => void
}

export default function AddCard({ addCard }: AddCardProps) {
  const [added, setAdded] = useState(false);

  const [title, setTitle] = useState("");

  const submitCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addCard(new CardData(title));
    setAdded(true);
    setTitle('');
  };
  
  return (
    <>
      <div>
        <form onSubmit={submitCard}>
          <input type="text"
            placeholder={added ? 'Add another card' : 'Add a card'}
            value={title}
            onChange={ e =>  setTitle(e.target.value) }
            required
          />

          <button>Save</button>
        </form>
      </div>
    </>
  );
}