import React from 'react';

const Modal = ({ isOpen, title, description, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-2">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="mb-4">{description}</div>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 bg-neutral-400 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-900 text-blue-50 rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;