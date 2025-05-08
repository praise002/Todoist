import { useMemo, useState } from 'react';
import { loadTodos, saveTodos } from '../utils/localStorage.ts';
import { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Header from '../Layouts/Header.tsx';
import Form from './Form.tsx';
import TodoItem from './TodoItem.tsx';

import Spinner from './Spinner.tsx';
import { Todo } from '../types.ts';
import toast from 'react-hot-toast';

const filterObj = {
  all: {
    name: 'All',
    ariaLabel: 'Show all todos',
  },
  active: {
    name: 'Active',
    ariaLabel: 'Show active todos',
  },
  completed: {
    name: 'Completed',
    ariaLabel: 'Show completed todos',
  },
};

const FILTER_MAP: Record<string, (todo: Todo) => boolean> = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};

const filterValues = Object.values(filterObj);
console.log(Object.keys(filterObj));
console.log(Object.values(filterObj));

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const filteredTodos = todos.filter(FILTER_MAP[filter]);
  // filter_map['All']
  // console.log(FILTER_MAP[filter]); returns the fnction
  // console.log(todos.filter((todo) => !todo.completed));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const storedTodos = loadTodos();
    setTodos(storedTodos);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const incompleteTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  function handleFilterChange(filterName: string) {
    setFilter(filterName);
  }

  function clearCompleted() {
    const remainingTodos = todos.filter((todo) => !todo.completed);
    setTodos(remainingTodos);
    saveTodos(remainingTodos);
    toast.success('Completed tasks cleared Successfully');
    console.log(remainingTodos);
  }

  function addTodo(text: string) {
    const newTask = { id: crypto.randomUUID(), todo, completed: false };
    // setTodo((prevTodos) => [...prevTodos, newTask]);
    setTodos((prevTodos) => {
      const newTodos = [newTask, ...prevTodos];
      saveTodos(newTodos);
      return newTodos;
    });
  }

  function toggleTaskCompleted(id: string) {
    const updatedTodos = todos.map((todo) =>
      id === todo.id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    console.log(updatedTodos);
  }

  function deleteTodo(id: string) {
    const remainingTodos = todos.filter((todo) => id !== todo.id);
    setTodos(remainingTodos);
    saveTodos(remainingTodos);
    toast.success('Deleted task Successfully');
    console.log(remainingTodos);
  }

  function getTodoIndex(id: string) {
    return todos.findIndex((todo) => todo.id === id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId !== overId) {
      setTodos((todos) => {
        const oldIndex = getTodoIndex(activeId);
        const newIndex = getTodoIndex(overId);

        const newArray = arrayMove(todos, oldIndex, newIndex);
        saveTodos(newArray);
        return newArray;
      });
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto -mt-50">
      <Header />
      <Form addTodo={addTodo} />
      <div className="rounded-md shadow-md bg-white dark:bg-[#25273C]">
        {isLoading ? (
          <Spinner />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    item={todo}
                    onToggleTaskCompleted={toggleTaskCompleted}
                    onDeleteTask={deleteTodo}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}

        {todos.length > 0 && (
          <div className="flex justify-between p-4 text-sm text-gray-600 dark:text-gray-200">
            <div>
              <p>
                {incompleteTodos === 0
                  ? 'No items left'
                  : `${incompleteTodos} ${
                      incompleteTodos === 1 ? 'item' : 'items'
                    } left`}
              </p>
            </div>
            <div className="sm:flex gap-2 hidden">
              {filterValues.map((value) => (
                <button
                  key={value.name}
                  type="button"
                  className="hover:text-blue-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-blue-600"
                  aria-label={value.ariaLabel}
                  onClick={() => handleFilterChange(value.name)}
                >
                  {value.name}
                </button>
              ))}
            </div>
            <div>
              <button
                type="button"
                className="hover:text-blue-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-blue-600"
                aria-label="Clear completed todos"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            </div>
          </div>
        )}
      </div>

      {todos.length > 0 && (
        <div className="flex gap-4 sm:hidden mt-4 bg-white dark:bg-[#25273C] dark:text-gray-200 justify-center p-4">
          {filterValues.map((value) => (
            <button
              key={value.name}
              type="button"
              className="hover:text-blue-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-blue-600"
              aria-label={value.ariaLabel}
              onClick={() => handleFilterChange(value.name)}
            >
              {value.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
