'use client';

import { useState } from 'react';

export default function BuscadorJugador() {
  const [criterio, setCriterio] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mensajeError, setMensajeError] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setResultados([]);

    if (!criterio.trim()) return;

    try {
      // Realiza la búsqueda directamente por gamertag
      const res = await fetch(`/api/jugadores?gamertag=${encodeURIComponent(criterio.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Jugador no encontrado');
      }

      // Normaliza la respuesta para manejar tanto Arrays como Objetos individuales
      const listaNormalizada = Array.isArray(data) ? data : [data];

      if (listaNormalizada.length === 0) {
        setMensajeError('No se encontraron jugadores.');
      } else {
        setResultados(listaNormalizada);
      }
    } catch (error) {
      setMensajeError(error.message);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    const f = new Date(fecha);
    return isNaN(f.getTime()) ? 'Fecha inválida' : f.toLocaleDateString();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-indigo-300">Buscar Jugador</h2>
      
      <form onSubmit={handleBuscar} className="space-y-4 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por gamertag..."
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

      {/* Mensaje de Error */}
      {mensajeError && (
        <div className="p-3 bg-red-600/20 border border-red-500 text-red-200 rounded text-sm">
          {mensajeError}
        </div>
      )}

      {/* Lista de Resultados */}
      {resultados.length > 0 && (
        <div className="space-y-3">
          {resultados.map((jugador, index) => (
            <div 
              key={jugador.id || jugador.gamertag || index} 
              className="bg-gray-750 p-4 rounded-lg border border-gray-600 text-sm space-y-1"
            >
              <p><span className="text-gray-400">Gamertag:</span> <strong className="text-indigo-300">{jugador.gamertag}</strong></p>
              <p><span className="text-gray-400">Nombre:</span> <span className="text-white">{jugador.nombre}</span></p>
              <p><span className="text-gray-400">Correo:</span> <span className="text-white">{jugador.correo}</span></p>
              <p>
                <span className="text-gray-400">Fecha de Registro:</span>{' '}
                <span className="text-white">{formatearFecha(jugador.fechaRegistro || jugador.fecha_registro)}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}