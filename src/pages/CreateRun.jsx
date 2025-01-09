import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateRun() {
    const [formData, setFormData] = useState({
        title: '',
        miles: '',
        location: 'INDOOR',
        startedOn: '',
        completedOn: '',
    });
    const [runs, setRuns] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing runs to calculate the next ID
        axios
            .get('http://localhost:8080/api/runs')
            .then((response) => setRuns(response.data))
            .catch(() => setError('Failed to fetch existing runs.'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate the next ID
        const nextId = runs.length > 0 ? Math.max(...runs.map((run) => run.id)) + 1 : 1;

        const payload = {
            id: nextId, // Add calculated ID
            title: formData.title,
            miles: parseInt(formData.miles, 10),
            startedOn: new Date(formData.startedOn).toISOString(),
            completedOn: new Date(formData.completedOn).toISOString(),
            location: formData.location.toUpperCase(),
        };

        axios
            .post('http://localhost:8080/api/runs/create', payload)
            .then(() => {
                navigate('/runs'); // Redirect to the runs page
            })
            .catch((error) => {
                setError(
                    error.response?.data?.message || 'Failed to create run. Please check your input.'
                );
            });
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-4">Create New Run</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Miles</label>
                    <input
                        type="number"
                        name="miles"
                        value={formData.miles}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Location</label>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="INDOOR">Indoor</option>
                        <option value="OUTDOOR">Outdoor</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Started On</label>
                    <input
                        type="datetime-local"
                        name="startedOn"
                        value={formData.startedOn}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Completed On</label>
                    <input
                        type="datetime-local"
                        name="completedOn"
                        value={formData.completedOn}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Create Run
                </button>
            </form>
        </div>
    );
}
