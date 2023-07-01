import React, { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
        Abrir Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modal</h2>
            <p>Contenido del modal...</p>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
