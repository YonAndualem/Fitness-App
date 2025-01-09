import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditRun() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        miles: '',
        location: 'INDOOR',
        startedOn: '',
        completedOn: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/runs/${id}`)
            .then((response) => {
                const run = response.data;
                setFormData({
                    title: run.title,
                    miles: run.miles,
                    location: run.location,
                    startedOn: run.startedOn.slice(0, 16), // Format for datetime-local input
                    completedOn: run.completedOn.slice(0, 16),
                    version: run.version, // Include the version field
                });
            })
            .catch(() => setError('Failed to load run details.'));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            id: parseInt(id, 10), // Include the ID
            title: formData.title,
            miles: parseInt(formData.miles, 10),
            location: formData.location.toUpperCase(),
            startedOn: new Date(formData.startedOn).toISOString(),
            completedOn: new Date(formData.completedOn).toISOString(),
            version: formData.version, // Send the version for optimistic locking
        };

        axios
            .put(`http://localhost:8080/api/runs/update/${id}`, payload)
            .then(() => {
                navigate('/runs'); // Redirect to the runs page
            })
            .catch(() => {
                setError('Failed to update run. Please check your input.');
            });
    };


    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-4">Edit Run</h2>
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
                    Update Run
                </button>
            </form>
        </div>
    );
}
