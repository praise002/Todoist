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

// hU8zWD8obsxShs3g