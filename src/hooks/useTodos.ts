import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../services/apiTodos';

export function useTodos() {
  const {
    isPending,
    data: todos,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  return { isPending, error, todos };
}
