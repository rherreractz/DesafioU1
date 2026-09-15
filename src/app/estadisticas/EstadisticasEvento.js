'use client';

import { useState, useEffect } from 'react';

export default function EstadisticasEventos() {
  const [estadisticas, setEstadisticas] = useState({
    totalJugadores: 0,
    totalVideojuegos: 0,
    totalPuntuaciones: 0,
    sumaPuntuacionesTotales: 0, // <--- Guardará la suma total de puntos acumulados
    puntuacionPromedio: 0,
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerEstadisticas() {
      try {
        const [resJugadores, resVideojuegos, resPuntuaciones] = await Promise.all([
          fetch('/api/jugadores').then((r) => (r.ok ? r.json() : [])),
          fetch('/api/videojuegos').then((r) => (r.ok ? r.json() : [])),
          fetch('/api/puntuaciones').then((r) => (r.ok ? r.json() : [])),
        ]);

        const listaJugadores = Array.isArray(resJugadores) ? resJugadores : [];
        const listaVideojuegos = Array.isArray(resVideojuegos) ? resVideojuegos : [];
        const listaPuntuaciones = Array.isArray(resPuntuaciones) ? resPuntuaciones : [];

        // SUMA TOTAL: Acumula los puntos de todos los registros
        const sumaPuntos = listaPuntuaciones.reduce(
          (acc, item) => acc + Number(item.puntuacion || 0),
          0
        );

        // PROMEDIO: Suma de puntos dividida entre la cantidad de registros
        const promedio =
          listaPuntuaciones.length > 0 ? sumaPuntos / listaPuntuaciones.length : 0;

        setEstadisticas({
          totalJugadores: listaJugadores.length,
          totalVideojuegos: listaVideojuegos.length,
          totalPuntuaciones: listaPuntuaciones.length,
          sumaPuntuacionesTotales: sumaPuntos,
          puntuacionPromedio: promedio,
        });
      } catch (error) {
        console.error('Error al calcular puntos totales:', error);
      } finally {
        setCargando(false);
      }
    }

    obtenerEstadisticas();
  }, []);

  const {
    totalJugadores,
    totalVideojuegos,
    totalPuntuaciones,
    sumaPuntuacionesTotales,
    puntuacionPromedio,
  } = estadisticas;

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Total Jugadores</span>
        <p className="text-3xl font-bold text-white">
          {cargando ? '...' : totalJugadores}
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Total Videojuegos</span>
        <p className="text-3xl font-bold text-white">
          {cargando ? '...' : totalVideojuegos}
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Registros de Puntos</span>
        <p className="text-3xl font-bold text-white">
          {cargando ? '...' : totalPuntuaciones}
        </p>
      </div>

      {/* TARJETA QUE SUMA TODOS LOS PUNTOS */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Puntos Totales Sumados</span>
        <p className="text-3xl font-bold text-emerald-400">
          {cargando ? '...' : sumaPuntuacionesTotales.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Puntuación Promedio</span>
        <p className="text-3xl font-bold text-indigo-400">
          {cargando ? '...' : Number(puntuacionPromedio).toFixed(2)}
        </p>
      </div>
    </section>
  );
}