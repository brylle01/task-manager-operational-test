import React from 'react';
import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface Props {
  tasks : Task[];
  onToggle : (id: number) => void;
  onEdit : (task: Task) => void;
  onDelete : (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) return (
    <div className="text-center py-12 text-gray-400">
      <p className="text-4xl mb-3">📋</p>
      <p className="text-lg font-medium">No tasks yet</p>
      <p className="text-sm">Add a task above to get started</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {tasks.map(task => (
        <TaskItem
            key      = {task.id}
            task     = {task}
            onToggle = {onToggle}
            onEdit   = {onEdit}
            onDelete = {onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
