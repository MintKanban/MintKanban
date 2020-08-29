import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardData from '../Types/CardData';
import InputGroup from 'react-bootstrap/InputGroup';

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
        <Form onSubmit={submitCard}>
          <InputGroup className="mb-2">
            <Form.Control type="text"
                          placeholder={added ? 'Add another card' : 'Add a card'}
                          value={title}
                          onChange={ e =>  setTitle(e.target.value) }
                          required
            />
            <InputGroup.Append>
              <Button type="submit">Add</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </>
  );
}
