'use client';

import { useState, useEffect } from 'react';

export default function Clasificacion() {
  const [ranking, setRanking] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let montado = true;

    async function cargarRanking() {
      try {
        const [resPuntuaciones, resJugadores, resVideojuegos] = await Promise.all([
          fetch('/api/puntuaciones').then((r) => (r.ok ? r.json() : [])),
          fetch('/api/jugadores').then((r) => (r.ok ? r.json() : [])),
          fetch('/api/videojuegos').then((r) => (r.ok ? r.json() : [])),
        ]);

        if (!montado) return;

        const listaPuntuaciones = Array.isArray(resPuntuaciones) ? resPuntuaciones : [];
        const listaJugadores = Array.isArray(resJugadores) ? resJugadores : [];
        const listaJuegos = Array.isArray(resVideojuegos) ? resVideojuegos : [];

        // MAPA PARA AGRUPAR POR JUGADOR ÚNICO
        const mapaJugadores = new Map();

        // 1. INICIALIZAR EL MAPA CON TODOS LOS JUGADORES REGISTRADOS (0 PUNTOS)
        listaJugadores.forEach((j) => {
          const idJugador = String(j.id);
          const nombreJugador = j.gamertag || j.nombre || `Jugador #${idJugador}`;

          mapaJugadores.set(idJugador, {
            id: idJugador,
            jugador: nombreJugador,
            videojuego: 'Sin registros',
            puntuacion: 0,
            tienePuntos: false, // Flag para verificar si ya registró algún punto
          });
        });

        // 2. ACTUALIZAR CON LAS PUNTUACIONES MÁS ALTAS
        listaPuntuaciones.forEach((p) => {
          const idJugador = String(p.jugadorId ?? p.jugador_id ?? '');
          const idJuego = String(p.videojuegoId ?? p.videojuego_id ?? '');
          const puntos = Number(p.puntuacion ?? p.puntos ?? 0);

          const v = listaJuegos.find((jue) => String(jue.id) === idJuego);
          const nombreJuego = v ? (v.nombre || v.titulo) : `Juego #${idJuego || 'S/N'}`;

          if (mapaJugadores.has(idJugador)) {
            const registroActual = mapaJugadores.get(idJugador);

            // Si es la primera puntuación que se le encuentra o si supera la anterior
            if (!registroActual.tienePuntos || puntos > registroActual.puntuacion) {
              mapaJugadores.set(idJugador, {
                ...registroActual,
                videojuego: nombreJuego,
                puntuacion: puntos,
                tienePuntos: true,
              });
            }
          }
        });

        // 3. CONVERTIR A ARRAY Y ORDENAR DE MAYOR A MENOR PUNTUACIÓN
        const datosUnicos = Array.from(mapaJugadores.values()).sort(
          (a, b) => b.puntuacion - a.puntuacion
        );

        setRanking(datosUnicos);
      } catch (error) {
        console.error('Error al construir el ranking:', error);
      } finally {
        if (montado) setCargando(false);
      }
    }

    cargarRanking();

    return () => {
      montado = false;
    };
  }, []);

  if (cargando) {
    return <p className="text-slate-400 py-6 text-center">Cargando clasificación...</p>;
  }

  if (ranking.length === 0) {
    return (
      <p className="text-slate-400 py-6 text-center">
        No hay jugadores registrados aún.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-700/50 text-slate-400 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Posición</th>
            <th className="px-4 py-3">Jugador</th>
            <th className="px-4 py-3">Mejor Videojuego</th>
            <th className="px-4 py-3">Máxima Puntuación</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {ranking.map((item, index) => (
            <tr key={item.id} className="hover:bg-slate-700/30">
              <td className="px-4 py-3 font-bold text-indigo-400">#{index + 1}</td>
              <td className="px-4 py-3">{item.jugador}</td>
              <td className="px-4 py-3">{item.videojuego}</td>
              <td className="px-4 py-3 font-semibold text-emerald-400">
                {item.puntuacion.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}