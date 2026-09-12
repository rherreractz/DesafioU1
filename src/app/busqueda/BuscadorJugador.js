'use client';

import { useState } from 'react';

export default function BuscadorJugador() {
  const [criterio, setCriterio] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState('gamertag'); // 'gamertag' o 'nombre'
  const [jugadorEncontrado, setJugadorEncontrado] = useState(null);
  const [mensajeError, setMensajeError] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setJugadorEncontrado(null);

    if (!criterio.trim()) return;

    try {
      // Petición GET con parámetro URL (?nombre=... o ?gamertag=...)
      const res = await fetch(`/api/jugadores?${tipoBusqueda}=${encodeURIComponent(criterio)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Jugador no encontrado');
      }

      setJugadorEncontrado(data);
    } catch (error) {
      setMensajeError(error.message);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-indigo-300">Buscar Jugador</h2>
      
      <form onSubmit={handleBuscar} className="space-y-4 mb-4">
        <div className="flex gap-2">
          <select
            value={tipoBusqueda}
            onChange={(e) => setTipoBusqueda(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm"
          >
            <option value="gamertag">Gamertag</option>
            <option value="nombre">Nombre</option>
          </select>
          <input
            type="text"
            placeholder={`Buscar por ${tipoBusqueda}...`}
            className="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded text-sm transition"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Mensaje de Error (404 o 500) */}
      {mensajeError && (
        <div className="p-3 bg-red-600/20 border border-red-500 text-red-200 rounded text-sm">
          {mensajeError}
        </div>
      )}

      {/* Mostrar Resultado */}
      {jugadorEncontrado && (
        <div className="bg-gray-750 p-4 rounded-lg border border-gray-600 text-sm space-y-2">
          <p><span className="text-gray-400">ID:</span> <span className="text-white font-medium">{jugadorEncontrado.id}</span></p>
          <p><span className="text-gray-400">Gamertag:</span> <strong className="text-indigo-300">{jugadorEncontrado.gamertag}</strong></p>
          <p><span className="text-gray-400">Nombre:</span> <span className="text-white">{jugadorEncontrado.nombre}</span></p>
          <p><span className="text-gray-400">Correo:</span> <span className="text-white">{jugadorEncontrado.correo}</span></p>
          <p><span className="text-gray-400">Fecha de Registro:</span> <span className="text-white">{new Date(jugadorEncontrado.fechaRegistro).toLocaleDateString()}</span></p>
        </div>
      )}
    </div>
  );
}