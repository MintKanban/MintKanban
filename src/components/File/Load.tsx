import React, { cloneElement, FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import BCard from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from "react-bootstrap";

interface LoadProps {
  loadList: (serializedList: string) => void
}

const Load: FC<LoadProps> = ({ loadList, children }) => {

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ["application/json"]
  });

  const [show, setShow] = useState(false);

  function onSubmit() {
    acceptedFiles[0]?.text().then(serializedList => {
      loadList(serializedList);
      setShow(false);
    }, e => {
      console.error(e);
    })
  }

  return <>
    { cloneElement(children as any, { onClick: () => setShow(true) }) }
    <Modal show={ show } onHide={ () => setShow(false) }>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Load from File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BCard className="justify-content-center align-items-center mb-2" { ...getRootProps() }>
            <BCard.Body>
              <input { ...getInputProps() } />
              <span>Drag 'n' drop some files here, or click to select files</span>
            </BCard.Body>
          </BCard>
          { acceptedFiles[0] && <p>File: { acceptedFiles[0].name }</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Load</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default Load;
