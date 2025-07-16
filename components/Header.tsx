
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md z-10">
      <div className="container mx-auto flex items-center">
        <div className="bg-blue-500 text-white font-bold rounded-md px-3 py-1 text-xl">
          GAO
        </div>
        <h1 className="text-xl font-bold text-white ml-3">GAO AI</h1>
      </div>
    </header>
  );
};

export default Header;
