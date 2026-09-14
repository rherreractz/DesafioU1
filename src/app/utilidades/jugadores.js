import { obtenerJugadores, buscarJugador, registrarJugador } from '../../../DB/Jugadores/jugadores';

export async function getJugadores(){
  const jugadoresDB = await obtenerJugadores();
  const jugadores = jugadoresDB.map((jugador) => ({
    id: jugador.id,
    nombre: jugador.nombre,
    gamertag: jugador.gamertag,
    correo: jugador.email,
    fechaRegistro: jugador.fecha_registro,
  }));
  return jugadores;
}

export async function crearJugador(nuevoJugador) {
  const existeGamertag = await determinarSiElGamertagExiste(nuevoJugador.gamertag);
  if (existeGamertag) {
    throw new Error('El gamertag ya existe.');
  }
  await registrarJugador(nuevoJugador.nombre, nuevoJugador.gamertag, nuevoJugador.correo);
}

export async function determinarSiElGamertagExiste(gamertag) {
  const jugadores = await obtenerJugadores();
  const existe = jugadores.some((jugador) => jugador.gamertag === gamertag);
  return existe;
}

export async function buscarJugadores(nombre) {
  const jugadores = await buscarJugador(nombre);
  return jugadores;
}