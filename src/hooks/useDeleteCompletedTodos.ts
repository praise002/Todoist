import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompletedTodos } from '../services/apiTodos';
import toast from 'react-hot-toast';

export function useDeleteCompletedTodos() {
  const queryClient = useQueryClient();

  const { isPending: isClearing, mutate: clearCompletedTodos } = useMutation({
    mutationFn: deleteCompletedTodos,
    onSuccess: () => {
      toast.success('Completed Todos successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isClearing, clearCompletedTodos };
}
