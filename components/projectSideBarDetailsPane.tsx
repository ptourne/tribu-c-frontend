import React, { useState, useEffect } from "react";
import { Proyecto } from "../pages/types";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
}

function ProjectSideBarDetailsPane({ project }: ProjectSideBarProps) {
  const [name, setName] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.nombre || "");
      setState(project.estado || "");
    }
  }, [project]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
  };

  const handleSave = () => {
    // Create an object with the updated values
    const updatedProject = {
      id: project?.id,
      nombre: name,
      estado: state,
    };

    // Make an API request to save the changes
    // ...
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            Estado
          </label>
          <textarea
            className="form-control"
            id="state"
            value={state}
            onChange={handleStateChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default ProjectSideBarDetailsPane;
