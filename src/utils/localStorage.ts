import toast from 'react-hot-toast';
import TODOS from './todos.js';

const STORAGE_KEY = 'todos';

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
  let todos;
  try {
    todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    toast.error('Error loading todos from localStorage');
  }
  return todos ? todos : TODOS;
}
