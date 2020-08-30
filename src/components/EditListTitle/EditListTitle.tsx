import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface EditListTitleProps {
  listName: string,
  renameList: (newListName: string) => void;
}

export default function EditListTitle(
  { listName, renameList }: EditListTitleProps) {

  const [newListname, setNewListname] = useState(listName)
  const [editing, setEditing] = useState(false);

  const saveTitle = () => {
    setEditing(false);
    renameList(newListname);
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
          onChange={ e => setNewListname(e.target.value)}
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
