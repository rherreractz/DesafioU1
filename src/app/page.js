'use client';

import { useState, useEffect } from 'react';
import RegistroJugador from './Jugador/Registro';
import BuscadorJugador from './busqueda/BuscadorJugador';
import RegistroPuntos from './puntuacion/RegistroPuntos';
import RegistroJuego from './juegos/RegistroJuego';
import Clasificacion from './clasificacion/clasificacion';
import EstadisticasEvento from './estadisticas/EstadisticasEvento';
import EstadoJugador from './EstadoJugador/EstadoJugador';

export default function Home() {
  const [jugadores, setJugadores] = useState([]);
  const [notificacion, setNotificacion] = useState(null);
  
  // Estado para controlar la sección principal ('dashboard' | 'registros' | 'buscar')
  const [vistaActiva, setVistaActiva] = useState('dashboard');
  
  // Estado para controlar el sub-registro activo ('jugador' | 'videojuego' | 'puntuacion')
  const [subRegistroActivo, setSubRegistroActivo] = useState('jugador');

  const cargarDatos = async () => {
    try {
      const resJugadores = await fetch('/api/jugadores');
      if (resJugadores.ok) {
        const dataJugadores = await resJugadores.json();
        setJugadores(Array.isArray(dataJugadores) ? dataJugadores : []);
      }
    } catch (err) {
      mostrarNotificacion('Error al conectar con la API', 'error');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <main className="max-w-7xl mx-auto space-y-6 w-full overflow-hidden">
        {/* Encabezado Principal */}
        <header className="border-b border-gray-800 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-400">
              Sistema de Gestión de Videojuegos
            </h1>
            <p className="text-gray-400 text-sm">
              Plataforma de torneos, ranking y estadísticas en tiempo real.
            </p>
          </div>

          {/* Navegación Principal */}
          <nav className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setVistaActiva('dashboard')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                vistaActiva === 'dashboard'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard & Ranking
            </button>
            <button
              onClick={() => setVistaActiva('registros')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                vistaActiva === 'registros'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Registros
            </button>
            <button
              onClick={() => setVistaActiva('buscar')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                vistaActiva === 'buscar'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Buscar Jugador
            </button>
          </nav>
        </header>

        {/* Banner de Notificaciones */}
        {notificacion && (
          <div
            className={`p-4 rounded border text-sm font-medium ${
              notificacion.tipo === 'exito'
                ? 'bg-green-900/40 border-green-500 text-green-200'
                : 'bg-red-900/40 border-red-500 text-red-200'
            }`}
          >
            {notificacion.mensaje}
          </div>
        )}

        {/* SECCIÓN 1: DASHBOARD & RANKING */}
        {vistaActiva === 'dashboard' && (
          <div className="space-y-6">
            <EstadisticasEvento />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <div className="lg:col-span-2">
                <Clasificacion />
              </div>
              <div>
                <EstadoJugador jugadores={jugadores} />
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 2: REGISTROS SEPARADOS POR PESTAÑAS */}
        {vistaActiva === 'registros' && (
          <div className="space-y-6">
            {/* Sub-Navegación para seleccionar qué formulario ver */}
            <div className="flex border-b border-gray-800 gap-4 pb-2">
              <button
                onClick={() => setSubRegistroActivo('jugador')}
                className={`pb-2 text-sm font-bold border-b-2 transition ${
                  subRegistroActivo === 'jugador'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                Registrar Jugador
              </button>
              <button
                onClick={() => setSubRegistroActivo('videojuego')}
                className={`pb-2 text-sm font-bold border-b-2 transition ${
                  subRegistroActivo === 'videojuego'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                Registrar Videojuego
              </button>
              <button
                onClick={() => setSubRegistroActivo('puntuacion')}
                className={`pb-2 text-sm font-bold border-b-2 transition ${
                  subRegistroActivo === 'puntuacion'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                Registrar Puntuación
              </button>
            </div>

            {/* Renderizado individual según la pestaña elegida */}
            <div className="max-w-xl mx-auto w-full">
              {subRegistroActivo === 'jugador' && (
                <RegistroJugador
                  onJugadorRegistrado={(respuesta, tipo) => {
                    mostrarNotificacion(
                      tipo === 'exito' ? 'Jugador registrado con éxito' : respuesta,
                      tipo
                    );
                    cargarDatos();
                  }}
                />
              )}

              {subRegistroActivo === 'videojuego' && (
                <RegistroJuego
                  onJuegoRegistrado={(respuesta, tipo) => {
                    mostrarNotificacion(
                      tipo === 'exito' ? 'Videojuego registrado con éxito' : respuesta,
                      tipo
                    );
                    cargarDatos();
                  }}
                />
              )}

              {subRegistroActivo === 'puntuacion' && (
                <RegistroPuntos
                  jugadores={jugadores}
                  onPuntuacionRegistrada={(respuesta, tipo) => {
                    mostrarNotificacion(
                      tipo === 'exito' ? 'Puntuación guardada con éxito' : respuesta,
                      tipo
                    );
                    cargarDatos();
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* SECCIÓN 3: BÚSQUEDA DE JUGADORES */}
        {vistaActiva === 'buscar' && (
          <div className="w-full">
            <BuscadorJugador />
          </div>
        )}
      </main>
    </div>
  );
}