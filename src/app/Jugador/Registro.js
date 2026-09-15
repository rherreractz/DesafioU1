'use client';

import { useState } from 'react';

export default function RegistroJugador({ onJugadorRegistrado }) {
  const [nombre, setNombre] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estructura para el backend (id y fechaRegistro son manejados por el servidor/DB)
    const jugadorPayload = {
      nombre,
      gamertag,
      correo
    };

    try {
      const res = await fetch('/api/jugadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jugadorPayload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al registrar el jugador');

      setNombre('');
      setGamertag('');
      setCorreo('');
      if (onJugadorRegistrado) onJugadorRegistrado(data, 'exito');
    } catch (error) {
      if (onJugadorRegistrado) onJugadorRegistrado(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
      <h2 className="text-xl font-bold text-indigo-300">Registrar Jugador</h2>
      
      <div>
        <label className="block text-sm text-gray-300 mb-1">Nombre Completo *</label>
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Gamertag *</label>
        <input
          type="text"
          required
          value={gamertag}
          onChange={(e) => setGamertag(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Correo Electrónico *</label>
        <input
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        />
      </div>

      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded transition">
        Registrar Jugador
      </button>
    </form>
  );
}