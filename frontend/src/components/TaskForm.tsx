import React, { useState, useEffect } from 'react';
import type { CreateTaskInput, Task } from '../types/task';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskInput) => void;
  task?: Task | null;
}

const TaskForm: React.FC<Props> = ({ isOpen, onClose, onSubmit, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type = "text"
            placeholder = "Task title"
            value = {title}
            onChange = {e => setTitle(e.target.value)}
            required
            autoFocus
            className = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type = "text"
            placeholder = "Description (optional)"
            value = {description}
            onChange = {e => setDescription(e.target.value)}
            className = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type = "submit"
            className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {isEditing ? 'Save Changes' : '+ Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
