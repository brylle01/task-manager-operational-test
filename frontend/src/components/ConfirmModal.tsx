import React from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-4 p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick   = {onCancel}
            className = "flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
              Cancel
          </button>
          <button
            onClick   = {onConfirm}
            className = "flex-1 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
