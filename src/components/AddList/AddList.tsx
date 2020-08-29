import React, { useState } from 'react';
import Card from '../Types/Card';

interface AddListProps {
    lists: Record<string, Card[]>
    setLists: React.Dispatch<React.SetStateAction<Record<string, Card[]>>>
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

  return (
    <>
      <div onClick={() => setAddButton(true)}>
        <div
          style={{
            display: addButton ? "none" : "inline-block"
          }}
        >
          + Add a new list
        </div>

        <form
          style={{
            display: addButton ? "inline-block" : "none"
          }}
          onSubmit = {addList}
        >
          <input type="text"
            value={listName}
            onChange={updateListName}
            required
          />
          <button>Add List</button>
        </form>
      </div>
    </>
  );
}