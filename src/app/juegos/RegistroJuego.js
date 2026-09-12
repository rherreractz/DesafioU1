'use client';

import { useState } from 'react';

export default function RegistroJuego({ onJuegoRegistrado }) {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Objeto JSON Videojuego enviado al servidor
    const videojuegoPayload = {
      nombre,
      genero
    };

    try {
      const res = await fetch('/api/videojuegos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videojuegoPayload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al registrar el videojuego');

      setNombre('');
      setGenero('');
      if (onJuegoRegistrado) onJuegoRegistrado(data, 'exito');
    } catch (error) {
      if (onJuegoRegistrado) onJuegoRegistrado(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
      <h2 className="text-xl font-bold text-indigo-300">Registrar Videojuego</h2>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Nombre del Juego *</label>
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Género *</label>
        <input
          type="text"
          required
          placeholder="Ej. RPG, Acción, Deportes"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        />
      </div>

      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded transition">
        Guardar Videojuego
      </button>
    </form>
  );
}