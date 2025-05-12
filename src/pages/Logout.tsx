import { FiLogOut } from 'react-icons/fi';
import { useLogout } from '../hooks/useLogout';

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <button
      disabled={isPending}
      onClick={() => logout}
      type="button"
      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      <FiLogOut role="presentation" className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}

export default Logout;
