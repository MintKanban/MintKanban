import React, { useState } from 'react';
import Card from '../Types/Card';

interface AddCardProps {
    setCard: (card: Card) => void
}

export default function AddCard({ setCard }: AddCardProps) {
  const [added, setAdded] = useState(false);

  const [title, setTitle] = useState("");

  const addCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCard(new Card(title));
    setAdded(true);
    setTitle('');
  };


  // const remove = () => {
  //   const idx = cards.indexOf(card);
  //   let cardsClone = cards.concat();
  //   cardsClone.splice(idx, 1);
  //   setCards(cardsClone);
  // }

  // const edit = () => {
  
  // }
  
  return (
    <>
      <div>
        <form onSubmit={addCard}>
          <input type="text"
            placeholder={added ? 'Add another card' : 'Add a card'}
            value={title}
            onChange={ e =>  setTitle(e.target.value) }
            required
          />

          {/* <h2>Description</h2>
          <textarea 
            value = {desciption}
            onChange={updateTextArea}>

            </textarea> */}
          <button>Save</button>
          {/* <button onClick={remove}>Delete</button>
          <button onClick={edit}>Edit</button> */}
        </form>
      </div>
    </>
  );
}