import React from 'react';
import type { Task } from '../types/task';
import { Trash2, Pencil } from 'lucide-react';

interface Props {
  task : Task;
  onToggle : (id: number) => void;
  onEdit : (task: Task) => void;
  onDelete : (id: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div>
          <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick   = {() => onToggle(task.id)}
          className = {`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            task.completed
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          onClick   = {() => onEdit(task)}
          className = "text-blue-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"
        >
          <Pencil size={18}/>
        </button>
        <button
          onClick   = {() => onDelete(task.id)}
          className = "text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
        >
          <Trash2 color='red' size={24}/>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
