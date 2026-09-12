'use client';

import { useState } from 'react';

export default function EstadoJugador({ jugadores = [] }) {
  const [busqueda, setBusqueda] = useState('');

  const jugadoresFiltrados = jugadores.filter(
    (j) =>
      j.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      j.gamertag?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold text-indigo-300">Consulta de Jugadores</h2>
        <input
          type="text"
          placeholder="Buscar por Nombre o Gamertag..."
          className="bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white w-full sm:w-64"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
            <tr>
              <th className="p-3">Gamertag</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Fecha de Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {jugadoresFiltrados.map((j, index) => (
              <tr key={j.id || index} className="hover:bg-gray-750">
                <td className="p-3 font-medium text-white">{j.gamertag}</td>
                <td className="p-3">{j.correo}</td>
                <td className="p-3">
                  {j.fechaRegistro
                    ? new Date(j.fechaRegistro).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
            {jugadoresFiltrados.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}