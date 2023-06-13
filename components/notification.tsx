import React from "react";

function Notification({ message, onClose }) {
  return (
    <div
      className="toast position-fixed top-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">Notification</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
}

export default Notification;
