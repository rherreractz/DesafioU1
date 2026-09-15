'use client';

import { useState, useEffect } from 'react';

export default function RegistroPuntos({ onPuntuacionRegistrada }) {
  const [jugadores, setJugadores] = useState([]);
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargandoCatalogos, setCargandoCatalogos] = useState(true);

  const [jugadorId, setJugadorId] = useState('');
  const [videojuegoId, setVideojuegoId] = useState('');
  const [puntuacion, setPuntuacion] = useState('');

  // Carga independiente de jugadores y videojuegos desde la API
  useEffect(() => {
    async function cargarCatalogos() {
      try {
        const [resJ, resV] = await Promise.all([
          fetch('/api/jugadores').then((r) => (r.ok ? r.json() : [])),
          fetch('/api/videojuegos').then((r) => (r.ok ? r.json() : [])),
        ]);

        const listaJugadores = Array.isArray(resJ) ? resJ : resJ.jugadores || [];
        const listaVideojuegos = Array.isArray(resV) ? resV : resV.videojuegos || [];

        setJugadores(listaJugadores);
        setVideojuegos(listaVideojuegos);
      } catch (error) {
        console.error('Error al cargar catálogos en RegistroPuntos:', error);
      } finally {
        setCargandoCatalogos(false);
      }
    }

    cargarCatalogos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const puntajePayload = {
      jugadorId: Number(jugadorId),
      videojuegoId: Number(videojuegoId),
      puntuacion: Number(puntuacion),
      fecha: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/puntuaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puntajePayload),
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
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-indigo-300">Registrar Puntuación</h2>

      {/* Select de Jugadores */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Jugador *</label>
        <select
          required
          value={jugadorId}
          onChange={(e) => setJugadorId(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="">
            {cargandoCatalogos ? 'Cargando jugadores...' : '-- Selecciona un jugador --'}
          </option>
          {jugadores.map((j) => (
            <option key={j.id} value={j.id}>
              {j.gamertag || j.nombre} ({j.nombre || j.correo})
            </option>
          ))}
        </select>
      </div>

      {/* Select de Videojuegos con fallback de propiedades */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Videojuego *</label>
        <select
          required
          value={videojuegoId}
          onChange={(e) => setVideojuegoId(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="">
            {cargandoCatalogos ? 'Cargando videojuegos...' : '-- Selecciona un juego --'}
          </option>
          {videojuegos.map((v) => {
            const nombre = v.nombre || v.titulo || `Juego #${v.id}`;
            const genero = v.genero || v.categoria || v.plataforma || 'General';
            return (
              <option key={v.id} value={v.id}>
                {nombre} ({genero})
              </option>
            );
          })}
        </select>
      </div>

      {/* Campo Puntuación */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Puntuación*</label>
        <input
          type="number"
          min="0"
          required
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={cargandoCatalogos}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded transition disabled:opacity-50"
      >
        Guardar Puntuación
      </button>
    </form>
  );
}