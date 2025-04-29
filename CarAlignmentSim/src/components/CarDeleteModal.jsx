import React, { useState } from "react";
import { API_BASE_URL } from "../api";

export default function CarDeleteModal({ carId, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleConfirm = () => {
    fetch(`${API_BASE_URL}/cars/${carId}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          onDelete(carId);
          close();
          window.location.reload();
        } else {
          console.error("Delete failed:", res.status);
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <button
        className="btn btn-delete-toggle"
        onClick={open}
        disabled={!carId}
      >
        Delete Car
      </button>

      {isOpen && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete this car?</p>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={handleConfirm}>
                Yes, Delete
              </button>
              <button className="btn btn-cancel" onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
