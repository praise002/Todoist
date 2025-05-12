import { useMutation, useQueryClient } from '@tanstack/react-query';
import {updateTodosOrder } from '../services/apiTodos';
import toast from 'react-hot-toast';

export function useReorderTodos() {
  const queryClient = useQueryClient();

  const { mutate: reorderTodo, isPending: isReordering } = useMutation({
    mutationFn: updateTodosOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { reorderTodo, isReordering };
}
