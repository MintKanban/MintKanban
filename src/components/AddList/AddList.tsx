import React, { useState } from 'react';
import CardData from '../Types/CardData';
import BCard from 'react-bootstrap/Card';
import { Button, Form, InputGroup } from "react-bootstrap";

interface AddListProps {
  lists: Record<string, CardData[]>
  setLists: React.Dispatch<React.SetStateAction<Record<string, CardData[]>>>
  listOrder: string[]
  setListOrder: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AddList({ lists, setLists, listOrder, setListOrder }: AddListProps) {
  const [addButton, setAddButton] = useState(false);
  const [listName, setListName] = useState('');
  const updateListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };
  const addList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLists({ ...lists, [listName]: [] });
    setListOrder(listOrder.concat([listName]));
    setAddButton(false);
    setListName('');
  };

  function cardBody() {
    if (addButton) {
      return <>
        <BCard.Header>
          <Form onSubmit={ addList }>
            <InputGroup>
              <Form.Control type="text"
                            value={ listName }
                            onChange={ updateListName }
                            required
                            autoFocus
              />
              <InputGroup.Append>
                <Button type="submit">Create</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </BCard.Header>
        </>
    } else {
      return <BCard.Body className="d-flex align-items-center justify-content-center">
        <Button onClick={ () => setAddButton(true) } variant="link">Add a new list</Button>
      </BCard.Body>
    }
  }

  return <BCard className="list-card">
    { cardBody() }
  </BCard>
}
