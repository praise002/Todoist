import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditTodo } from '../services/apiTodos';
import toast from 'react-hot-toast';
import { CreateTodoParams } from '../types';

export function useEditTodo() {
  const queryClient = useQueryClient();

  const { mutate: editTodo, isPending: isEditing } = useMutation({
    mutationFn: ({ newTodo, id }: CreateTodoParams) =>
      createEditTodo(newTodo, id),
    onSuccess: () => {
      toast.success('Todo successfully edited');
      // Invalidates todos cache to trigger refresh
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTodo };
}
