import { useMemo, useState } from 'react';

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

import { useTodos } from '../hooks/useTodos.ts';
import { useCreateTodo } from '../hooks/useCreateTodo.ts';
import { useEditTodo } from '../hooks/useEditTodo.ts';
import { useDeleteTodo } from '../hooks/useDeleteTodo.ts';

import { useReorderTodos } from '../hooks/updateTodosOrder.ts';
import { useDeleteCompletedTodos } from '../hooks/useDeleteCompletedTodos.ts';

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
// console.log(Object.keys(filterObj));
// console.log(Object.values(filterObj));

function TodoList() {
  const { isPending, todos = [] } = useTodos();
  const { isCreating, createTodo } = useCreateTodo();
  const { isEditing, editTodo } = useEditTodo();
  const { deleteTodo } = useDeleteTodo();
  const { clearCompletedTodos } = useDeleteCompletedTodos();
  const { reorderTodo } = useReorderTodos();

  const [filter, setFilter] = useState('All');

  const filteredTodos = todos.filter(FILTER_MAP[filter]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8, // Require 8px movement to start drag (good for touch)
      tolerance: 500, // Allow longer press delay
    },}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const incompleteTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  function handleFilterChange(filterName: string) {
    setFilter(filterName);
  }

  function clearCompleted() {
    if (clearCompletedTodos) {
      clearCompletedTodos();
    }
  }

  function addTodo(todo: string) {
    const newTodo = { todo, completed: false };
    createTodo({ newTodo });
  }

  function toggleTaskCompleted(id: string) {
    const todo = todos.find((t) => t.id == id);
    if (!todo) return;
    editTodo({
      newTodo: { ...todo, completed: !todo.completed },
      id: todo.id,
    });
  }

  function handleDeleteTodo(id: string) {
    deleteTodo(id);
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
      const oldIndex = getTodoIndex(activeId);
      const newIndex = getTodoIndex(overId);
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      reorderTodo(newTodos);
      // console.log(newTodos);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto -mt-50">
      <Header />
      <Form addTodo={addTodo} isAddingTodo={isCreating} />
      <div className="rounded-md shadow-md bg-white dark:bg-[#25273C]">
        {isPending ? (
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
                    onDeleteTask={handleDeleteTodo}
                    isTogglingTodo={isEditing}
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
