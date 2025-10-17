import type { Todo } from './types';
export const MOCK_TODOS: Todo[] = [
  { id: 'todo-1', text: 'Design the UI concept', completed: true, createdAt: Date.now() - 20000 },
  { id: 'todo-2', text: 'Build the frontend', completed: false, createdAt: Date.now() - 10000 },
  { id: 'todo-3', text: 'Connect to the backend API', completed: false, createdAt: Date.now() },
];