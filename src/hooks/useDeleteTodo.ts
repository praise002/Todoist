import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo as deleteTodoApi } from '../services/apiTodos';
import toast from 'react-hot-toast';

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      toast.success('Todo successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTodo };
}
