import React, { useState } from 'react';
import DeleteListConfirmation from '../DeleteListConfirmation/DeleteListConfirmation';

interface ListDropdownProps {
  listName: string,
  deleteList: () => void
}

export default function ListDropdown(
  { listName, deleteList }: ListDropdownProps) {
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmation = () => {
    setShowDropdown(false);
    setShowConfirmation(true);
  };
  
  return (
    <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
      <button className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-expanded={showDropdown}
        onClick={() => setShowDropdown(!showDropdown)}
        onBlur={(e: any) => {
          if (!e.relatedTarget || e.relatedTarget.className !== 'dropdown-item') {
            setShowDropdown(false);
          }
        }}
      >
        <div className="three-dot-menu"></div>
      </button>
      <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} 
        aria-labelledby="dropdownMenuButton"
      >
        <button className="dropdown-item"
          onClick={openConfirmation}
        >
          Delete
        </button>
      </div>

      <DeleteListConfirmation
        show={showConfirmation}
        listName={listName}
        deleteList={deleteList}
        handleClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}