import React from "react";

const Modal = () => {
  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </form>
    </dialog>
  );
}

export default Modal;
