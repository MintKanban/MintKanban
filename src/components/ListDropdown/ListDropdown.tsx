import React from 'react';
import { Dropdown } from "react-bootstrap";

interface ListDropdownProps {
  deleteList: () => void
}

export default function ListDropdown({ deleteList }: ListDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" size="sm">
        <div className="three-dot-menu" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={ deleteList }>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
