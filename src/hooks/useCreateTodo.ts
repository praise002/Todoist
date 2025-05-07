import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditTodo } from '../services/apiTodos';
import toast from 'react-hot-toast';
import { CreateTodoParams } from '../types';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationFn: ({ newTodo, id = '' }: CreateTodoParams) =>
      createEditTodo(newTodo, id),
    onSuccess: () => {
      toast.success('New Todo successfully created');
      // Invalidates todos cache to trigger refresh
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTodo };
}
