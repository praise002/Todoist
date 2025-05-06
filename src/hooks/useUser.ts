import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth';

// queryKey: Unique identifier for caching ('user')
// queryFn: Function to fetch user data
export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isPending, user, isAuthenticated: user?.role === 'authenticated' };
}
