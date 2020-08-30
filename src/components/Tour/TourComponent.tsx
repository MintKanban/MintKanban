import React, { useState } from 'react';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface TourComponentProps {
  editModalTour: boolean,
  setEditModalTour: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TourComponent(
  { editModalTour, setEditModalTour }: TourComponentProps) {

  const [show, setShow] = useState(false);
  const accentColor = "#5cb7b7";
  
  const disableBody = (target: HTMLElement) => (
    disableBodyScroll(target)
  );
  const enableBody = (target: HTMLElement) => (
    enableBodyScroll(target)
  );
  
  const steps = [
    {
      selector: '#first-step',
      content: 'This is a list.'
    },
    {
      selector: '#second-step',
      content: 'This is the title. Double click on it to edit. ' +
        '                      ' +
        "Note: You can't have multiple lists with the same name " +
        "(CASE-INSENSITIVE)."
    },
    {
      selector: '#third-step',
      content: 'Click this button to delete the list.'
    },
    {
      selector: '#fourth-step',
      content: 'These are the tasks in your list.' +
        'Click on one to edit its details.'
    },
    {
      selector: '#fifth-step',
      content: () => {
        if (!editModalTour) setEditModalTour(true);
        
        return "You can the edit a task's title.";
      }
    },
    {
      selector: '#sixth-step',
      content: () => {
        if (!editModalTour) setEditModalTour(true);
        
        return "You can the edit a task's description.";
      }
    },
    {
      selector: '#seventh-step',
      content: () => {
        if (!editModalTour) setEditModalTour(true);
        
        return (
          "Click one of the following buttons to SAVE, DELETE, or CANCEL " +
          "your edits."
        );
      }
    },
  ];

  return (
    <>
      <button onClick={ () => setShow(true) }>Take a tour!</button>
      <Tour
        onRequestClose={ () => setShow(false) }
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