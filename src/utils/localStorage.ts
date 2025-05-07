import toast from 'react-hot-toast';
import { Todo } from '../types';

const STORAGE_KEY = 'todos';

export function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos(): Todo[] {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    toast.error('Error loading todos from localStorage');
    return [];
  }
}
