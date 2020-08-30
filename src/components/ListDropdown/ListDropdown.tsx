import React, { useState } from 'react';

interface ListDropdownProps {
  deleteList: () => void
}

export default function ListDropdown({ deleteList }: ListDropdownProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={`dropdown ${show ? 'show' : ''}`}>
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded={show}
      onClick={() => setShow(!show)}
      onBlur={(e: any) => {
        if (!e.relatedTarget || e.relatedTarget.className !== 'dropdown-item') {
          setShow(false);
        }
      }}
      >
        <div className="three-dot-menu"></div>
      </button>
      <div className={`dropdown-menu ${show ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item"
          onClick={deleteList}
        >
          Delete
        </button>
      </div>
    </div>
  );
}