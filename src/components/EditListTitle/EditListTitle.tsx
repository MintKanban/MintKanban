import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface EditListTitleProps {
  listName: string,
  listOrder: string[],
  renameList: (newListName: string) => void,
  duplicate: boolean,
  setDuplicate: (arg0: boolean) => void
}

export default function EditListTitle(
  { listName, listOrder, renameList, duplicate, setDuplicate }: EditListTitleProps
) {

  const [newListName, setNewListName] = useState(listName)
  const [editing, setEditing] = useState(false);
  
  const listOrderCopy = listOrder.concat().map( title => title.toLowerCase());
  useEffect(() => {
    if (listName.toLowerCase() === newListName.toLowerCase()) {
      setDuplicate(false);
    } else {
      setDuplicate(listOrderCopy.includes(newListName.toLowerCase()));
    }
  }, [listName, newListName, listOrderCopy, setDuplicate]);

  const saveTitle = (e: any) => {
    e.preventDefault();
    if (!newListName || duplicate) return null;
    setEditing(false);
    renameList(newListName);
  };

  useEffect(() => {
    if (editing) {
      const listNameInput = document.getElementById(`${listName}-input`);
      listNameInput?.focus();
    }
  }, [editing, listName])

  if (editing) {
    return (
      <Form onSubmit={saveTitle}>
        <Form.Control
          type="text"
          id={`${listName}-input`}
          required
          defaultValue={listName}
          onChange={ e => setNewListName(e.target.value) }
          onFocus={ (e: React.FocusEvent<HTMLInputElement>) => 
            e.target.select()
          }
          onBlur={saveTitle}
        />
      </Form>
    );
  } else {
    return (
      <h5 onDoubleClick={() => setEditing(true)}>
        {listName}
      </h5>
    );
  }
}
