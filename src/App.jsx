import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Runs from './pages/Runs';
import RunDetails from './pages/RunDetails';
import CreateRun from './pages/CreateRun';
import EditRun from './pages/EditRun';
import Home from './pages/Home';
export default function App() {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-10 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/runs" element={<Runs />} />
          <Route path="/contact" element={<h2 className="text-3xl">Contact Page</h2>} />
          <Route path="/runs/:id" element={<RunDetails />} />
          <Route path="/runs/create" element={<CreateRun />} />
          <Route path="/runs/edit/:id" element={<EditRun />} />
        </Routes>
      </main>
    </div>
  );
}
