import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RxCross2 } from 'react-icons/rx';
import { TodoItemProps } from '../types';

function TodoItem({
  item,
  onToggleTaskCompleted,
  onDeleteTask,
  isTogglingTodo,
}: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-4 text-gray-900 dark:text-gray-200 border-b border-b-gray-400"
    >
      <div className="flex items-center gap-x-2 w-full">
        {item.completed ? (
          <>
            <button
              type="button"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full  bg-gradient-to-br from-blue-400 to-purple-500 w-4 h-4 p-1"
              onClick={() => onToggleTaskCompleted(item.id)}
              disabled={isTogglingTodo}
              aria-label="Mark task as completed"
            >
              <img
                src="/icon-check.svg"
                className="w-2 h-2"
                alt="Icon check"
              />
            </button>
            <div
              {...attributes}
              {...listeners}
              className="flex items-center w-full justify-between"
            >
              <p className="line-through text-gray-400">{item.todo}</p>
            </div>
            <button
              type="button"
              className="cursor-pointer hover:bg-blue-400 p-2 transition-colors rounded-full"
              aria-label="Delete task"
              onClick={() => onDeleteTask(item.id)}
            >
              <RxCross2 aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full border border-gray-600 dark:border-gray-300 w-4 h-4"
              onClick={() => onToggleTaskCompleted(item.id)}
              disabled={isTogglingTodo}
              aria-label="Mark task as uncompleted"
            ></button>
            <div
              {...attributes}
              {...listeners}
              className="flex items-center w-full justify-between"
            >
              <p>{item.todo}</p>
            </div>
            <button
              type="button"
              className="cursor-pointer hover:bg-blue-400 p-2 transition-colors rounded-full"
              aria-label="Delete task"
              onClick={() => onDeleteTask(item.id)}
            >
              <RxCross2 aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
