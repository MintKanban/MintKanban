import React, { useState, useEffect } from 'react';
import CardData from '../Types/CardData';
import BCard from 'react-bootstrap/Card';
import { Button, Form, InputGroup } from "react-bootstrap";

interface AddListProps {
  lists: Record<string, CardData[]>,
  setLists: React.Dispatch<React.SetStateAction<Record<string, CardData[]>>>
  listOrder: string[]
  setListOrder: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AddList(
  { lists, setLists, listOrder, setListOrder }: AddListProps) {

  const [addButton, setAddButton] = useState(false);
  const [listName, setListName] = useState('');
  const updateListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };
  const [duplicate, setDuplicate] = useState(false);
  const listOrderCopy = listOrder.concat().map( title => title.toLowerCase());
  useEffect(() => {
    setDuplicate(listOrderCopy.includes(listName.toLowerCase()));
  }, [listName, listOrderCopy]);
  const addList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (duplicate) return null;
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
          <BCard.Body>
            <div>
              { duplicate ? 'That list already exists' : '' }
            </div>
          </BCard.Body>
        </>
    } else {
      return (
        <BCard.Body id="eigth-step"
          className="d-flex align-items-center justify-content-center"
          onClick={ () => setAddButton(true) }
        >
          <Button variant="link">Add a new list</Button>
        </BCard.Body>
      );
    }
  }

  return <BCard className="list-card">
    { cardBody() }
  </BCard>
}
