import React, { useState } from 'react';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface TourComponentProps {
  firstVisit: boolean,
  editModalTour: boolean,
  setEditModalTour: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TourComponent(
  { firstVisit, editModalTour, setEditModalTour }: TourComponentProps) {
  const [show, setShow] = useState(firstVisit);
  const accentColor = "#5cb7b7";

  const handleClose = () => {
    setShow(false);
    setEditModalTour(false);
  };
  
  const disableBody = (target: HTMLElement) => (
    disableBodyScroll(target)
  );
  const enableBody = (target: HTMLElement) => (
    enableBodyScroll(target)
  );
  
  const steps = [
    {
      selector: '#first-step',
      content: () => (
        <div>
          <div>
            "Welcome to tmrw! This is your board!
          </div>
          <br/>
          <div>
            You can quickly reorder lists, and tasks by dragging and dropping them with your cursor.
          </div>
          <br/>
          <div>
            You can reorder task cards within the same list, move them over to another list, and even reorder the lists themselves!"
          </div>
        </div>
      ),
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#second-step',
      content: "To get started, here's a list.",
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#third-step',
      content: "At the top is the title. Double click on it to edit.",
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#fourth-step',
      content: 'If you want to delete a list, you can do so here.',
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#fifth-step',
      content: 'Below the title, are a list of all the tasks.',
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#sixth-step',
      content: 'Click on one to edit its details.',
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#seventh-step',
      content: 'You can edit the title.',
      action: () => {
        if (!editModalTour) setEditModalTour(true);
      }
    },
    {
      selector: '#eigth-step',
      content: "At the bottom of the list, you'll find the option to add more tasks",
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    },
    {
      selector: '#ninth-step',
      content: "And on the right of the page, you'll find the option to add new lists.",
      action: () => {
        if (editModalTour) setEditModalTour(false);
      }
    }
  ];

  return (
    <>
      <button 
        type="button" 
        className="btn btn-secondary mr-3"
        onClick={() => setShow(true)}>Take a tour!</button>    
      <Tour
        onRequestClose={handleClose}
        steps={steps}
        isOpen={show}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
      />
    </>
  );
}