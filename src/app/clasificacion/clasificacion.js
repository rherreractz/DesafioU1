'use client';

export default function TablaClasificacion({ ranking = [] }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-indigo-300">Clasificación (Ranking)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
            <tr>
              <th className="p-3">Posición</th>
              <th className="p-3">Jugador</th>
              <th className="p-3">Videojuego</th>
              <th className="p-3">Puntuación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {ranking.map((item, index) => (
              <tr key={index} className="hover:bg-gray-750">
                <td className="p-3 font-bold text-indigo-400">{index + 1}</td>
                <td className="p-3 font-medium text-white">{item.gamertag || item.jugador}</td>
                <td className="p-3">{item.videojuego}</td>
                <td className="p-3 font-semibold text-yellow-400">{item.puntuacion}</td>
              </tr>
            ))}
            {ranking.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No hay puntuaciones registradas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}