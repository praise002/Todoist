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

// handleFilterChange: (filterName: string) => void;
//   clearCompleted(): void;

// export interface TodoProps extends Todo {
//   handleFilterChange: (filterName: string) => void;
//   clearCompleted: () => void;
// }

export interface FormProps {
  addTodo: (todo: string) => void;
}

export interface TodoItemProps {
  item: Todo;
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
