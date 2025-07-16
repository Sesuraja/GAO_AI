
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md z-10">
      <div className="container mx-auto flex items-center">
        <div className="bg-blue-500 text-white font-bold rounded-md px-3 py-1 text-xl">
          GAO AI
        </div>
      </div>
    </header>
  );
};

export default Header;
