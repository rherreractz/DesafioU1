'use client';

import { useState } from 'react';

export default function RegistroPuntos({ jugadores = [], videojuegos = [], onPuntuacionRegistrada }) {
  const [jugadorId, setJugadorId] = useState('');
  const [videojuegoId, setVideojuegoId] = useState('');
  const [puntuacion, setPuntuacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Objeto JSON Puntaje requerido por la API
    const puntajePayload = {
      jugadorId: Number(jugadorId),
      videojuegoId: Number(videojuegoId),
      puntuacion: Number(puntuacion),
      fecha: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/puntuaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puntajePayload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al guardar la puntuación');

      setJugadorId('');
      setVideojuegoId('');
      setPuntuacion('');
      if (onPuntuacionRegistrada) onPuntuacionRegistrada(data, 'exito');
    } catch (error) {
      if (onPuntuacionRegistrada) onPuntuacionRegistrada(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
      <h2 className="text-xl font-bold text-indigo-300">Registrar Puntuación</h2>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Jugador *</label>
        <select
          required
          value={jugadorId}
          onChange={(e) => setJugadorId(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        >
          <option value="">-- Selecciona un jugador --</option>
          {jugadores.map((j) => (
            <option key={j.id} value={j.id}>
              {j.gamertag} ({j.nombre})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Videojuego *</label>
        <select
          required
          value={videojuegoId}
          onChange={(e) => setVideojuegoId(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        >
          <option value="">-- Selecciona un juego --</option>
          {videojuegos.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nombre} ({v.genero})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Puntuación (&gt;= 0) *</label>
        <input
          type="number"
          min="0"
          required
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
        />
      </div>

      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded transition">
        Guardar Puntuación
      </button>
    </form>
  );
}