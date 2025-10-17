import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Todo } from '@shared/types';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
export type FilterType = 'all' | 'active' | 'completed';
type TodoState = {
  todos: Todo[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
};
type TodoActions = {
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => Promise<void>;
};
export const useTodoStore = create<TodoState & { actions: TodoActions }>()(
  immer((set, get) => ({
    todos: [],
    filter: 'all',
    loading: true,
    error: null,
    actions: {
      fetchTodos: async () => {
        set({ loading: true, error: null });
        try {
          const todos = await api<Todo[]>('/api/todos');
          set({ todos, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch todos';
          set({ error: errorMessage, loading: false });
          toast.error(errorMessage);
        }
      },
      addTodo: async (text: string) => {
        const optimisticTodo: Todo = {
          id: `temp-${Date.now()}`,
          text,
          completed: false,
          createdAt: Date.now(),
        };
        set((state) => {
          state.todos.push(optimisticTodo);
        });
        try {
          const newTodo = await api<Todo>('/api/todos', {
            method: 'POST',
            body: JSON.stringify({ text }),
          });
          set((state) => {
            const index = state.todos.findIndex((t) => t.id === optimisticTodo.id);
            if (index !== -1) {
              state.todos[index] = newTodo;
            }
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to add todo';
          toast.error(errorMessage);
          set((state) => {
            state.todos = state.todos.filter((t) => t.id !== optimisticTodo.id);
          });
        }
      },
      toggleTodo: async (id: string) => {
        const originalTodos = get().todos;
        set((state) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) {
            todo.completed = !todo.completed;
          }
        });
        try {
          await api<Todo>(`/api/todos/${id}`, { method: 'PUT' });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update todo';
          toast.error(errorMessage);
          set({ todos: originalTodos });
        }
      },
      deleteTodo: async (id: string) => {
        const originalTodos = get().todos;
        set((state) => {
          state.todos = state.todos.filter((t) => t.id !== id);
        });
        try {
          await api(`/api/todos/${id}`, { method: 'DELETE' });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to delete todo';
          toast.error(errorMessage);
          set({ todos: originalTodos });
        }
      },
      setFilter: (filter: FilterType) => {
        set({ filter });
      },
      clearCompleted: async () => {
        const completedTodos = get().todos.filter(t => t.completed);
        if (completedTodos.length === 0) return;
        const originalTodos = get().todos;
        set(state => {
          state.todos = state.todos.filter(t => !t.completed);
        });
        try {
          await api('/api/todos/clear-completed', { method: 'POST' });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to clear completed todos';
          toast.error(errorMessage);
          set({ todos: originalTodos });
        }
      },
    },
  }))
);