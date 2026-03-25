import axios from 'axios';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL : API_URL,
  headers : { 'Content-Type': 'application/json' }
});

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks/');
  return response.data;
};

// Get single task
export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get(`/tasks/${id}/`);
  return response.data;
};

// Create task
export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const response = await api.post('/tasks/', data);
  return response.data;
};

// Update task
export const updateTask = async (id: number, data: UpdateTaskInput): Promise<Task> => {
  const response = await api.put(`/tasks/${id}/`, data);
  return response.data;
};

// Partial update
export const patchTask = async (id: number, data: UpdateTaskInput): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}/`, data);
  return response.data;
};

// Delete task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}/`);
};