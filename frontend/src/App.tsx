import React, { useState } from 'react';
import type { Task, CreateTaskInput } from './types/task';
import useTasks  from './hooks/useTasks';
import TaskForm  from './components/TaskForm';
import TaskList  from './components/TaskList';
import ConfirmModal from './components/ConfirmModal';

const App: React.FC = () => {
  const { tasks, loading, mutating, error, clearError, addTask, editTask, toggleTask, removeTask, fetchTasks } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount   = tasks.filter(t => !t.completed).length;

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: CreateTaskInput) => {
    if (editingTask) {
      editTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTaskId !== null) {
      removeTask(deleteTaskId);
      setDeleteTaskId(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-full">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-gray-500 mt-1">Stay organized and get things done</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 animate-pulse">
              <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded mx-auto" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-full">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Task Manager
          </h1>
            <p className="text-gray-500 mt-1">Stay organized and get things done</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center justify-between bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">!</span>
                <p className="text-sm">{error}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick = {fetchTasks}
                className = "text-xs px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-colors"
              >
                Retry
              </button>
              <button
                onClick = {clearError}
                className = "text-red-400 hover:text-red-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-blue-500">{tasks.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
            <p className="text-xs text-gray-500 mt-1">Pending</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-green-500">{completedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
          </div>
        </div>

        {/* Add Task Button */}
        <button
          onClick   = {handleOpenCreate}
          disabled  = {mutating}
          className = "w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors mb-6"
        >
          + Add Task
        </button>

        {/* Add / Edit Task Modal */}
        <TaskForm
          isOpen = {isFormOpen}
          onClose = {() => setIsFormOpen(false)}
          onSubmit = {handleFormSubmit}
          task = {editingTask}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen = {deleteTaskId !== null}
          title = "Delete Task"
          message = "Are you sure you want to delete this task? This action cannot be undone."
          onConfirm = {handleDeleteConfirm}
          onCancel = {() => setDeleteTaskId(null)}
        />

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
          {mutating && (
            <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center z-10">
              <p className="text-gray-500 text-sm animate-pulse">Updating...</p>
            </div>
          )}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            All Tasks
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({tasks.length})
            </span>
          </h2>
          <div className="max-h-[60vh] overflow-y-auto">
            <TaskList
              tasks    = {tasks}
              onToggle = {toggleTask}
              onEdit   = {handleOpenEdit}
              onDelete = {id => setDeleteTaskId(id)}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
