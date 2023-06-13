import React, { useState, useEffect } from "react";
import { Proyecto } from "../pages/types";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { Turret_Road } from "next/font/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
}

function ProjectSideBarDetailsPane({ project }: ProjectSideBarProps) {
  const [name, setName] = useState("");
  const [pendingChanges, setPendingChanges] = useState(false);
  const [nameSaved, setNameSaved] = useState(true);
  const [state, setState] = useState("");
  const [stateSaved, setStateSaved] = useState(true);

  useEffect(() => {
    if (project) {
      setName(project.nombre || "");
      setState(project.estado || "");
    }
  }, [project]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameSaved(false);
    setPendingChanges(true);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
    setPendingChanges(true);
  };

  useEffect(() => {
    if (pendingChanges) {
      toast.warning(
        project
          ? "Se descartaron los cambios de " + project.nombre
          : "Se descartaron los cambios",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    }
    if (project) {
      setName(project.nombre || "");
      setState(project.estado || "");
      setNameSaved(true);
      setStateSaved(true);
      setPendingChanges(false);
    }
  }, [project]);

  const handleSave = () => {
    // Create an object with the updated values
    const updatedProject = {
      id: project?.id,
      nombre: name,
      estado: state,
    };

    // Make an API request to save the changes
    // ...

    if (true /*guardados correctamente*/) {
      toast.success("Cambios guardados correctamente!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div>
      <form>
        <div className="input-group mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control border-0 border-bottom rounded-0"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
          {nameSaved ? <AiOutlineCheck /> : <IoIosWarning />}
        </div>

        <div className="mb-3 input-group">
          <label htmlFor="state" className="form-label">
            Estado
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            value={state}
            onChange={handleStateChange}
          >
            <option value="En curso">En curso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          {stateSaved ? <AiOutlineCheck /> : <IoIosWarning />}
        </div>
        <button
          type="button"
          className={
            pendingChanges ? "btn btn-primary" : "btn btn-primary disabled"
          }
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ProjectSideBarDetailsPane;
