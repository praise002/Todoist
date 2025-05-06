import { FiEdit2, FiLogOut } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUser } from '../hooks/useUser';

function Navbar() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [name, setName] = useState(
    user?.user_metadata.displayName || 'John Doe'
  );
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length < 1) return;
    setIsEditing(false);
    console.log(name);
    updateUser({ displayName: name });
  }

  return (
    <div className="bg-white fixed top-0 left-0 right-0 dark:bg-gray-800 shadow-sm mb-6 p-4">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-3">
              <label className="relative">
                <input
                  type="text"
                  className="block w-full text-base px-5 py-3 bg-white border dark:border-gray-100 dark:bg-[#25273C] dark:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-gray-100"
                  value={name}
                  onChange={handleChange}
                  disabled={isUpdating}
                  autoFocus
                />
              </label>
              <button
                type="submit"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                disabled={isUpdating}
              >
                <span>{isUpdating ? 'Updating' : 'Save'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {name}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FiEdit2 className="h-4 w-4" />
                <span>Edit Name</span>
              </button>
            </div>
          </div>
        )}

        <button type="button">
          <Link
            to="/logout"
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
