import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function RunDetails() {
    const { id } = useParams();
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/runs/${id}`)
            .then((response) => {
                setRun(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch run details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-4">{run.title}</h2>
            <p>
                <strong>Distance:</strong> {run.miles} miles
            </p>
            <p>
                <strong>Location:</strong> {run.location}
            </p>
            <p>
                <strong>Started On:</strong> {new Date(run.startedOn).toLocaleString()}
            </p>
            <p>
                <strong>Completed On:</strong> {new Date(run.completedOn).toLocaleString()}
            </p>
        </div>
    );
}
