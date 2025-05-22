import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-5 mb-6">
      <div className="flex items-center gap-3">
        <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Image Analysis Tool
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;