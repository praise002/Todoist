useMutation: Handles API mutations (POST, PUT, DELETE)
useQueryClient: Manages React Query's cache
mutate: Function to trigger login
mutationFn: Actual API call function

const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  login(
    { email: data.email, password: data.password },
    {
      onSettled: () => {
        // This runs after login attempt completes (success or failure)
        reset(); // Reset form
        // Clean up loading states
        // Clear sensitive data
        // Any cleanup tasks
      }
    }
  );
};

login(
  { email, password },
  {
    onSuccess: (data) => {
      // Runs on successful login
      console.log('Login successful', data);
    },
    onError: (error) => {
      // Runs when login fails
      console.error('Login failed', error);
    },
    onSettled: () => {
      // Runs in both success and error cases
      console.log('Login attempt completed');
    }
  }
);