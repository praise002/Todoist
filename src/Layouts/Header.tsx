import { ThemeContext } from '../context/ThemeContext.js';
import { useContext } from 'react';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-white tracking-widest font-bold text-3xl">TODOIST</h1>
      {theme === 'light' ? (
        <button
          onClick={toggleTheme}
          className="w-5 h-5"
          aria-label="Toggle theme"
        >
          <img
            src="src/images/icon-moon.svg"
            className="w-full h-full"
            alt="Icon moon to toggle theme"
          />
        </button>
      ) : (
        <button
          onClick={toggleTheme}
          className="w-5 h-5"
          aria-label="Toggle theme"
        >
          <img
            src="src/images/icon-sun.svg"
            className="w-full h-full"
            alt="Icon sun to toggle theme"
          />
        </button>
      )}
    </header>
  );
}

export default Header;
