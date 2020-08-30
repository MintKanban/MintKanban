import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import DeleteListConfirmation from '../DeleteListConfirmation/DeleteListConfirmation';
import Dropdown from 'react-bootstrap/esm/Dropdown';

interface ListDropdownProps {
  id: string,
  listName: string,
  deleteList: () => void
}

export default function ListDropdown(
  { id, listName, deleteList }: ListDropdownProps) {
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  return (
    <div id={id}>
      <DropdownButton id="dropdown-item-button"
        title={<div className="three-dot-menu"></div>}
        >
        <Dropdown.Item as="button"
          onClick={() => setShowConfirmation(true)}
          >
          Delete
        </Dropdown.Item>

        <DeleteListConfirmation
          show={showConfirmation}
          listName={listName}
          deleteList={deleteList}
          handleClose={() => setShowConfirmation(false)}
          />
      </DropdownButton>
    </div>
  );
}
