import React, { useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';

interface DeleteListConfirmationProps {
  show: boolean,
  listName: string,
  deleteList: () => void,
  handleClose: () => void
}

export default function DeleteListConfirmation(
  { show, listName, deleteList, handleClose }: DeleteListConfirmationProps) {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this list?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Press delete to delete your {`${listName}`} list and all cards belonging to it.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteList}>
            Delete
          </Button>
        </Modal.Footer>
    </Modal>
  );
}