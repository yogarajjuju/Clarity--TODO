export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Clarity TODO application types
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}