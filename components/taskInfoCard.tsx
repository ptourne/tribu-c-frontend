import React, { useState } from "react";
import { Tarea } from "@/pages/types";
import { Button } from "react-bootstrap";
import TaskStatusButtons from "./taskStatusButtons";

interface Props {
  task: Tarea;
  onClick: () => void;
  selected: boolean;
}

const TaskInfoCard = ({ task, onClick, selected }: Props) => {
  const [selectedState, setSelectedState] = useState(task.estado);
  const NOMBRE_ESTADOS = ["No Iniciada", "Iniciada", "Terminada"];
  return (
    <div
      className={
        "d-flex flex-column justify-content-start text-primary-emphasis border bg-primary-subtle rounded-3 my-1 " +
        (selected ? "border-primary border-3" : "border-primary-subtle")
      }
      onClick={onClick}
    >
      <div className="d-flex flex-row justify-content-between align-items-center pt-1 pb-1 pl-5 pr-1">
        <div className="col-md-1 flex-fill">{task.id_tarea}</div>
        <div className="col-md-12 ml-2 flex-fill">{task.titulo}</div>

        <div className="col-md-12 ml-2 flex-fill">
          {NOMBRE_ESTADOS[task.estado]}
        </div>
      </div>
    </div>
  );
};

export default TaskInfoCard;
