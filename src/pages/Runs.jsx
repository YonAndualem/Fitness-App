import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [location, setLocation] = useState('');
  const [minDistance, setMinDistance] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch runs from the backend
    axios.get('http://localhost:8080/api/runs')
      .then((response) => {
        setRuns(response.data);
        setFilteredRuns(response.data); // Initialize filtered runs
      })
      .catch(() => {
        console.error('Failed to fetch runs.');
      });
  }, []);

  const applyFilters = () => {
    let filtered = runs;

    if (location) {
      filtered = filtered.filter((run) => run.location === location);
    }

    if (minDistance) {
      filtered = filtered.filter((run) => run.miles >= parseInt(minDistance, 10));
    }

    if (maxDistance) {
      filtered = filtered.filter((run) => run.miles <= parseInt(maxDistance, 10));
    }

    if (startDate) {
      filtered = filtered.filter((run) => new Date(run.startedOn) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((run) => new Date(run.completedOn) <= new Date(endDate));
    }

    setFilteredRuns(filtered);
  };

  const resetFilters = () => {
    // Clear all filter inputs
    setLocation('');
    setMinDistance('');
    setMaxDistance('');
    setStartDate('');
    setEndDate('');

    // Reset to the full list of runs
    setFilteredRuns(runs);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Runs</h1>

      {/* Filters Section */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All</option>
              <option value="INDOOR">Indoor</option>
              <option value="OUTDOOR">Outdoor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Min Distance (miles)</label>
            <input
              type="number"
              value={minDistance}
              onChange={(e) => setMinDistance(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Max Distance (miles)</label>
            <input
              type="number"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Runs List */}
      <div className="grid gap-4">
        {filteredRuns.map((run) => (
          <div key={run.id} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold">{run.title}</h2>
            <p><strong>Location:</strong> {run.location}</p>
            <p><strong>Distance:</strong> {run.miles} miles</p>
            <p><strong>Started On:</strong> {new Date(run.startedOn).toLocaleString()}</p>
            <p><strong>Completed On:</strong> {new Date(run.completedOn).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
