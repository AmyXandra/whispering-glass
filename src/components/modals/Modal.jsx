import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="p-6 w-full">
        {children}
        {onClose && (
          <button
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
