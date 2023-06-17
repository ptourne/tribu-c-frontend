import React from "react";
import { Tarea } from "@/pages/types";

interface Props {
  task: Tarea;
  onClick: () => void;
  selected: boolean;
}

const TaskInfoCard = ({ task, onClick, selected }: Props) => {
  return (
    <div
      className={
        "d-flex flex-column justify-content-start text-primary-emphasis border bg-primary-subtle rounded-3 " +
        (selected ? "border-primary border-3" : "border-primary-subtle")
      }
      onClick={onClick}
    >
      <div className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3">
        <div className="p-2">{task.id}</div>
        <div className="p-2">{task.titulo}</div>
        <div className="p-2">Estado: {task.estado}</div>
      </div>
    </div>
  );
};

export default TaskInfoCard;
