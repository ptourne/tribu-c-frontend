import React, { useState } from "react";
import { Proyecto } from "../pages/types";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
}

function ProjectSideBarDetailsPane({ project }: ProjectSideBarProps) {
  const [name, setName] = useState(project?.nombre || "filler");
  const [state, setState] = useState(project?.estado || "filler");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleSave = () => {
    // Create an object with the updated values
    const updatedProject = {
      id: project?.id,
      name: name,
      state: state,
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
