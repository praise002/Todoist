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
  todo: string;
  completed: boolean;
  position: number;
}

export type NewTodo = Omit<Todo, 'id' | 'position'> & {
  position?: number;  // Make position optional for new todos
};

// export type NewTodo = Omit<Todo, 'id'>;

// export type NewTodo = Omit<Todo, 'id' | 'position'>;

export interface FormProps {
  addTodo: (todo: string) => void;
  isAddingTodo: boolean;
}

export interface TodoItemProps {
  item: Todo;
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
  isTogglingTodo: boolean;
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
  id?: string;
};



// hU8zWD8obsxShs3g
