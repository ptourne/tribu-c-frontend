import React from "react";
import { Recurso } from "@/pages/types";

interface Props {
  recurso: Recurso;
  onClick: () => void;
  selected: boolean;
}

const RecursoInfoCard = ({ recurso, onClick, selected }: Props) => {
  return (
    <div
      className={
        "d-flex flex-column justify-content-start text-primary-emphasis border bg-primary-subtle rounded-3 " +
        (selected ? "border-primary border-3" : "border-primary-subtle")
      }
      onClick={onClick}
    >
      <div className="d-flex flex-row justify-content-start align-items-center">
        <div className="p-2 h4">{recurso.Nombre}</div>
        <div className="p-2 h4">{recurso.Apellido}</div>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <div className="p-2">Legajo: {recurso.legajo}</div>
      </div>
    </div>
  );
};

export default RecursoInfoCard;
