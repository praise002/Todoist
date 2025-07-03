import { useForm, SubmitHandler } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { LoginInputs } from '../types';
import { useLogin } from '../hooks/useLogin';
import Spinner from '../components/Spinner';

function Login() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    // console.log(data);
    if (!data.email || !data.password) return;
    login(
      { email: data.email, password: data.password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute z-50 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail role="presentation" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-600 dark:placeholder-gray-300 text-gray-900 dark:text-white dark:bg-gray-700 focus-visible:outline-none focus-visible:ring-blue-500 focus-visible:border-blue-500 sm:text-sm"
                placeholder="Email address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                disabled={isPending}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute z-50 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock role="presentation" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-600 dark:placeholder-gray-300 text-gray-900 dark:text-white dark:bg-gray-700 focus-visible:outline-none focus-visible:ring-blue-500 focus-visible:border-blue-500 sm:text-sm"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                disabled={isPending}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus-visible:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-400 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
