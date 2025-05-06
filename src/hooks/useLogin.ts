import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/apiAuth';
import toast from 'react-hot-toast';
import { LoginInputs } from '../types';

// useMutation: Handles API mutations (POST, PUT, DELETE)
// useQueryClient: Manages React Query's cache
// mutate: Function to trigger login
// mutationFn: Actual API call function

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials: LoginInputs) => loginApi(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('The provided email and password are incorrect');
    },
  });

  return { login, isPending };
}
