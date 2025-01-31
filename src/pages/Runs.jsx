import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [location, setLocation] = useState('');
  const [minDistance, setMinDistance] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

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
    setLocation('');
    setMinDistance('');
    setMaxDistance('');
    setStartDate('');
    setEndDate('');
    setFilteredRuns(runs);
  };

  const deleteRun = async (id) => {
    if (window.confirm('Are you sure you want to delete this run?')) {
      try {
        await axios.delete(`http://localhost:8080/api/runs/${id}`);
        console.log("Run deleted successfully:", id);

        // Update the state
        setRuns((prevRuns) => prevRuns.filter((run) => run.id !== id));
        setFilteredRuns((prevRuns) => prevRuns.filter((run) => run.id !== id));
      } catch (error) {
        console.error("Failed to delete run:", error.response || error.message);
        alert("Failed to delete run. Please try again.");
      }
    }
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
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => navigate(`/runs/edit/${run.id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteRun(run.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
