import React, { useState } from 'react';
import Card from '../Types/Card';

interface AddListProps {
    lists: Record<string, Card[]>
    setLists: React.Dispatch<React.SetStateAction<Record<string, Card[]>>>
    listOrder: string[]
    setListOrder: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AddList({ lists, setLists, listOrder, setListOrder }: AddListProps) {
  // React.MouseEvent<HTMLDivElement, MouseEvent>
  const [addButton, setAddButton] = useState(false);
  const [newList, setNewList] = useState('');
  const updateListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  };
  const addList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLists({ ...lists, [newList]: [] });
    setListOrder(listOrder.concat([newList]));
    setAddButton(false);
    setNewList('');
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

        <div
          style={{
            display: addButton ? "inline-block" : "none"
          }}
        >
          <input type="text"
            value={newList}
            onChange={updateListName}
          />
          <button
            onClick={addList}
          >
            Add List
          </button>
        </div>
      </div>
    </>
  );
}