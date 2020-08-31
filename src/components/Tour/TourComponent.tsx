import React, { useState } from 'react';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface TourComponentProps {
  firstVisit: boolean
}

export default function TourComponent({ firstVisit }: TourComponentProps) {
  const [show, setShow] = useState(firstVisit);
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
      content: () => (
        <div>
          <div>
            "Welcome to tmr! This is your board!
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
      )
    },
    {
      selector: '#second-step',
      content: "To get started, here's a list."
    },
    {
      selector: '#third-step',
      content: "At the top is the title. Double click on it to edit."
    },
    {
      selector: '#fourth-step',
      content: 'If you want to delete a list, you can do so here.'
    },
    {
      selector: '#fifth-step',
      content: 'Below the title, are a list of all the tasks.'
    },
    {
      selector: '#sixth-step',
      content: 'Click on one to edit its details.'
    },
    {
      selector: '#seventh-step',
      content: "At the bottom of the list, you'll find the option to add more tasks"
    },
    {
      selector: '#eigth-step',
      content: "And on the right of the page, you'll find the option to add new lists."
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