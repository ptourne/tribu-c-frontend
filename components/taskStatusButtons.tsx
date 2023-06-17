import React, { useState } from "react";

interface Props {
  selectedState: number;
  setSelectedState: (state: number) => void;
}

const TaskStatusButtons = ({ selectedState, setSelectedState }: Props) => {
  const SELECTOR_STYLE =
    "col-md-1 flex-fill p-0 m-0 btn overflow-x-hidden text-nowrap";

  return (
    <div className="ms-3 d-flex flex-fill">
      <div className="d-flex flex-row flex-fill align-items-stretch">
        <button
          className={
            SELECTOR_STYLE +
            " rounded-end-0" +
            (selectedState === 0 ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => {
            setSelectedState(0);
          }}
          type="button"
        >
          No iniciada
        </button>
        <button
          className={
            SELECTOR_STYLE +
            " rounded-0 border-start-0 border-end-0" +
            (selectedState === 1 ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => {
            setSelectedState(1);
          }}
          type="button"
        >
          Iniciada
        </button>
        <button
          className={
            SELECTOR_STYLE +
            " rounded-start-0" +
            (selectedState === 2 ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => {
            setSelectedState(2);
          }}
          type="button"
        >
          Terminada
        </button>
      </div>
    </div>
  );
};

export default TaskStatusButtons;
