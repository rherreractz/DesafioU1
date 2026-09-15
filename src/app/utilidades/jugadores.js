import { obtenerJugadores, buscarJugador, registrarJugador } from '../../../DB/Jugadores/jugadores';

export async function getJugadores() {
  const jugadoresDB = await obtenerJugadores();
  return jugadoresDB.map((jugador) => ({
    id: jugador.id,
    nombre: jugador.nombre,
    gamertag: jugador.gamertag,
    correo: jugador.email || jugador.correo,
    fechaRegistro: jugador.fecha_registro || jugador.fechaRegistro,
  }));
}

export async function crearJugador(nuevoJugador) {
  const existeGamertag = await determinarSiElGamertagExiste(nuevoJugador.gamertag);
  if (existeGamertag) {
    throw new Error('DUPLICADO: El gamertag ya existe.');
  }
  await registrarJugador(nuevoJugador.nombre, nuevoJugador.gamertag, nuevoJugador.correo);
}

export async function determinarSiElGamertagExiste(gamertag) {
  if (!gamertag) return false;
  const jugadores = await obtenerJugadores();
  // Validación insensible a mayúsculas y minúsculas
  return jugadores.some(
    (jugador) => jugador.gamertag?.toLowerCase() === gamertag.toLowerCase()
  );
}

export async function buscarJugadores(criterio) {
  // Acepta el parámetro tanto si viene por Nombre como por Gamertag
  const jugadoresDB = await buscarJugador(criterio);
  if (!jugadoresDB || jugadoresDB.length === 0) return [];

  // Mapeo estandarizado de propiedades para cumplir los esquemas del frontend
  return jugadoresDB.map((jugador) => ({
    id: jugador.id,
    nombre: jugador.nombre,
    gamertag: jugador.gamertag,
    correo: jugador.email || jugador.correo,
    fechaRegistro: jugador.fecha_registro || jugador.fechaRegistro,
  }));
}