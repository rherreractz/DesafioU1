'use client';

import { useState } from 'react';

export default function EstadoJugador({ jugadores = [] }) {
  const [busqueda, setBusqueda] = useState('');

  const jugadoresFiltrados = jugadores.filter(
    (j) =>
      j.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      j.gamertag?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    const f = new Date(fecha);
    return isNaN(f.getTime())
      ? 'Sin fecha'
      : f.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y Filtro de Búsqueda */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/80 shadow-lg flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-indigo-400 tracking-wide">
            Estado de Jugadores
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Consulta la lista de perfiles registrados y su actividad en la plataforma.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar por Nombre o Gamertag..."
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg py-2 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-600 whitespace-nowrap">
            {jugadoresFiltrados.length} Total
          </span>
        </div>
      </div>

      {/* Grid de Tarjetas de Jugadores */}
      {jugadoresFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jugadoresFiltrados.map((j, index) => {
            const inicial = (j.gamertag || j.nombre || 'J').charAt(0).toUpperCase();

            return (
              <div
                key={j.id || index}
                className="bg-gray-800/90 hover:bg-gray-800 border border-gray-700/70 hover:border-indigo-500/50 rounded-xl p-5 transition duration-200 shadow-md hover:shadow-indigo-500/10 flex flex-col justify-between space-y-4"
              >
                {/* Cabecera del Perfil */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold text-lg flex items-center justify-center shadow-inner border border-indigo-400/30">
                      {inicial}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base tracking-wide leading-tight">
                        {j.gamertag || 'Sin Gamertag'}
                      </h3>
                      {j.nombre && (
                        <p className="text-xs text-indigo-300/80 font-medium">{j.nombre}</p>
                      )}
                    </div>
                  </div>

                  {/* Badge de Estado */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Activo
                  </span>
                </div>

                {/* Detalles de Cuenta */}
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-750 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Correo Electrónico:</span>
                    <span className="text-gray-200 font-mono truncate max-w-[180px]" title={j.correo}>
                      {j.correo || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-2">
                    <span className="text-gray-400">Fecha de Registro:</span>
                    <span className="text-gray-300 font-medium">
                      {formatearFecha(j.fechaRegistro || j.fecha_registro)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Estado Vacío */
        <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-base font-medium">
            No se encontraron jugadores que coincidan con "<span className="text-indigo-400">{busqueda}</span>".
          </p>
        </div>
      )}
    </div>
  );
}