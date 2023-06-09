import React from "react";
import { Proyecto } from "@/pages/types";

interface Props {
  project: Proyecto;
  onClick: () => void;
  selected: boolean;
}

const statesList = ["No iniciado", "En curso", "Finalizado"];

const ProjectInfoCard = ({ project, onClick, selected }: Props) => {
  return (
    <div
      className={
        "d-flex flex-column justify-content-start text-primary-emphasis border bg-primary-subtle rounded-3 " +
        (selected ? "border-primary border-3" : "border-primary-subtle")
      }
      onClick={onClick}
    >
      <div className="d-flex flex-row justify-content-start align-items-center">
        <div className="p-2 h4">{project.codigo}</div>
        <div className="p-2 h4">{project.nombre}</div>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <div className="p-2">Estado: {statesList[project.estado]}</div>
      </div>
    </div>
  );
};

export default ProjectInfoCard;
