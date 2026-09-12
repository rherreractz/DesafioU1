'use client';

export default function EstadisticasEventos({ estadisticas }) {
  const {
    totalJugadores = 0,
    totalVideojuegos = 0,
    totalPuntuaciones = 0,
    puntuacionPromedio = 0,
  } = estadisticas || {};

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Total Jugadores</span>
        <p className="text-3xl font-bold text-white">{totalJugadores}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Total Videojuegos</span>
        <p className="text-3xl font-bold text-white">{totalVideojuegos}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Total Puntuaciones</span>
        <p className="text-3xl font-bold text-white">{totalPuntuaciones}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm">Puntuación Promedio</span>
        <p className="text-3xl font-bold text-indigo-400">
          {Number(puntuacionPromedio).toFixed(2)}
        </p>
      </div>
    </section>
  );
}