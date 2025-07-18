import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    // onSuccess: (user) => {
    //   console.log(user);
    //   toast.success(
    //     "Account successfully created! A verification email has been sent to your email address"
    //   );
    // },
    onSuccess: () => {
      toast.success(
        'Account successfully created! A verification email has been sent to your email address'
      );
    },
  });

  return { signup, isPending };
}
