import React, { useState } from 'react';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function TourComponent() {

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
      content: "To get started, here's a list."
    },
    {
      selector: '#second-step',
      content: "At the top is the title. Double click on it to edit."
    },
    {
      selector: '#third-step',
      content: 'If you want to delete a lest, you can do so here.'
    },
    {
      selector: '#fourth-step',
      content: 'Below the title, are a list of all the tasks.'
    },
    {
      selector: '#fifth-step',
      content: 'Click on one to edit its details.'
    },
    {
      selector: '#sixth-step',
      content: "At the bottom of the list, you'll find the option to add more tasks"
    },
    {
      selector: '#seventh-step',
      content: "And on the right of the page, you'll find the option to add new lists."
    },
    {
      selector: '#eigth-step',
      content: 'Lastly, you can quickly reorder lists, and tasks by dragging and dropping them with your cursor. You can reorder task cards within the same list, move them over to another list, and even reorder the lists themselves!'
    }
  ];

  return (
    <>
      <button 
        type="button" 
        className="btn btn-secondary mr-3"
        onClick={() => setShow(true)}>Take a tour!</button>    
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