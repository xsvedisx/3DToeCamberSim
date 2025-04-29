import React, { useState } from "react";
import CarForm from "./CarForm";

export default function CarFormModal({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleAdd = (newCar) => {
    onAdd(newCar);
    window.location.reload();
  };

  return (
    <>
      <button className="btn btn-add-toggle" onClick={open}>
        + Add Car
      </button>

      {isOpen && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <CarForm onAdd={handleAdd} />
            <button className="btn btn-cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
