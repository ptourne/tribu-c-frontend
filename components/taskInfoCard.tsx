import React, { useState } from "react";
import { Tarea } from "@/pages/types";
import { Button } from "react-bootstrap";

interface Props {
  task: Tarea;
  onClick: () => void;
  selected: boolean;
}

const TaskInfoCard = ({ task, onClick, selected }: Props) => {
  const validStates = [
    {
      label: <span>No iniciada</span>,
      value: 0,
      selectedBackgroundColor: "#0097e6",
    },
    {
      label: <span>Iniciada</span>,
      value: 1,
      selectedBackgroundColor: "#fbc531",
    },
    {
      label: <span>Terminada</span>,
      value: 2,
      selectedBackgroundColor: "#fbc531",
    },
  ];

  const [selectedState, setSelectedState] = useState(task.estado);
  const onStateChange = (newState: number) => {
    console.log(newState);
    setSelectedState(newState);
  };

  return (
    <div
      className={
        "d-flex flex-column justify-content-start text-primary-emphasis border bg-primary-subtle rounded-3 " +
        (selected ? "border-primary border-3" : "border-primary-subtle")
      }
      onClick={onClick}
    >
      <div className="d-flex flex-row justify-content-between align-items-center pt-1 pb-1 pl-5 pr-1">
        <div className="col-md-1 flex-fill">{task.id}</div>
        <div className="col-md-12 flex-fill">{task.titulo}</div>
        <div className="ms-3 col-md-12 flex flex-fill">
          <div className="d-flex flex-row flex-fill justify-content-between align-items-center">
            <button
              className={
                selectedState == 0
                  ? "col-md-1 flex-fill p-0 ml-1 mr-1 btn btn-primary"
                  : "col-md-1 flex-fill p-0 ml-1 mr-1 btn-outline-primary"
              }
              onClick={() => {
                setSelectedState(0);
              }}
              type="button"
            >
              No in
            </button>
            <button
              className={
                selectedState == 1
                  ? "col-md-1 flex-fill p-0 ml-1 mr-1 btn btn-primary"
                  : "col-md-1 flex-fill p-0 ml-1 mr-1 btn-outline-primary"
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
                selectedState == 2
                  ? "col-md-1 flex-fill p-0 ml-1 mr-1 btn btn-primary"
                  : "col-md-1 flex-fill p-0 ml-1 mr-1 btn-outline-primary"
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
      </div>
    </div>
  );
};

export default TaskInfoCard;
