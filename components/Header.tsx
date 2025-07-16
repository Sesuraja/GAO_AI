
import React from 'react';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="bg-gray-800 p-4 shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white font-bold rounded-md px-3 py-1 text-xl">
            GAO AI
          </div>
        </div>
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Start a new chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
         
        </button>
      </div>
    </header>
  );
};

export default Header;
