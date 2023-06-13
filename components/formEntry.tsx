import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  saved: boolean;
}

function FormEntry() {
  return (
    <div className="mb-3">
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
    </div>
  );
}

export default FormEntry;
