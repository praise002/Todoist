export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type NewTodo = Omit<Todo, 'id'>;

export interface FormProps {
  addTodo: (todo: string) => void;
}

export interface TodoItemProps {
  item: Todo;
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export type RegisterInputs = {
  name: string;
  email: string;
  password: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export interface User {
  name: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export type CreateTodoParams = {
  newTodo: NewTodo;
  id: string;
};

// hU8zWD8obsxShs3g
