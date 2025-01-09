import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 text-white">
        <h1 className="text-2xl font-bold">
          <Link to="/">Fitness App</Link>
        </h1>
        <nav className="space-x-6">
          <Link to="/runs/create" className="hover:text-gray-200">Create Run</Link>
          <Link to="/runs" className="hover:text-gray-200">Runs</Link>
          
        </nav>
      </div>
    </header>
  );
}
