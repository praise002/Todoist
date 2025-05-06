import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';
import { ProtectedRouteProps } from '../types';
import Spinner from './Spinner';

// children: as prop (protected content)
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate('/login');
    },
    [isAuthenticated, isPending, navigate]
  );

  // 3. While loading, show a spinner
  if (isPending) return <Spinner />;

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
