import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold mb-6">Welcome to Fitness App</h1>
            <p className="text-lg text-gray-600 mb-8">
                Track your runs and stay motivated!
            </p>
            <div className="flex space-x-4">
                <Link to="/runs" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View All Runs
                </Link>
                <Link to="/runs/create" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Add a New Run
                </Link>
            </div>
        </div>
    );
}
