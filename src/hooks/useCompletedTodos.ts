import { useQuery } from '@tanstack/react-query';
import { getCompletedTodos } from '../services/apiTodos';

export function useCompletedTodos() {
  const {
    isPending,
    data: completedTodos,
    error,
  } = useQuery({
    queryKey: ['completed-todos'],
    queryFn: getCompletedTodos,
  });

  return { isPending, error, completedTodos };
}
