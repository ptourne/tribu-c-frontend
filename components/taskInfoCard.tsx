import React from "react";
import { Tarea } from "@/pages/types";
import SwitchSelector from "react-switch-selector";

interface Props {
  task: Tarea;
  onClick: () => void;
  selected: boolean;
}

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

const TaskInfoCard = ({ task, onClick, selected }: Props) => {
  const onStateChange = (newState: number) => {
    console.log(newState);
  };

  const initialSelectedIndex = validStates.findIndex(
    ({ value }) => value === task.estado
  );

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
          <SwitchSelector
            onChange={onStateChange}
            options={validStates}
            optionBorderRadius={5}
            wrapperBorderRadius={7}
            selectionIndicatorMargin={1}
            initialSelectedIndex={initialSelectedIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskInfoCard;
