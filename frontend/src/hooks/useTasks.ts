import { useState, useEffect, useCallback } from 'react';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import * as taskApi from '../api/taskApi';

const useTasks = () => {
  const [tasks,     setTasks    ] = useState<Task[]>([]);
  const [loading,   setLoading  ] = useState(true);
  const [mutating,  setMutating ] = useState(false);
  const [error,     setError    ] = useState<string | null>(null);

  const getErrorMessage = (err: unknown, fallback: string): string => {
    if (err instanceof Error) return err.message;
    return fallback;
  };

  const clearError = () => setError(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const data = await taskApi.getTasks();
        setTasks(data);
    } catch (err) {
        setError(getErrorMessage(err, 'Failed to fetch tasks'));
    } finally {
        setLoading(false);
    }
  }, []);

  const addTask = async (data: CreateTaskInput) => {
    setMutating(true);
    setError(null);
    try {
        const newTask = await taskApi.createTask(data);
        setTasks(prev => [...prev, newTask]);
    } catch (err) {
        setError(getErrorMessage(err, 'Failed to create task'));
    } finally {
        setMutating(false);
    }
  };

  const editTask = async (id: number, data: UpdateTaskInput) => {
    setMutating(true);
    setError(null);
    try {
        const updated = await taskApi.updateTask(id, data);
        setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
        setError(getErrorMessage(err, 'Failed to update task'));
    } finally {
        setMutating(false);
    }
  };

  const toggleTask = async (id: number) => {
    setMutating(true);
    setError(null);
    try {
        const updated = await taskApi.patchTask(id, {});
        setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
        setError(getErrorMessage(err, 'Failed to toggle task'));
    } finally {
        setMutating(false);
    }
  };

  const removeTask = async (id: number) => {
    setMutating(true);
    setError(null);
    try {
        await taskApi.deleteTask(id);
        setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete task'));
    } finally {
        setMutating(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, mutating, error, clearError, addTask, editTask, toggleTask, removeTask, fetchTasks };
};

export default useTasks;
