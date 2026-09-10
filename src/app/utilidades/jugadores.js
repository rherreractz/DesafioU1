export const jugadores = [
  {
    id: 1,
    nombre: "Jugador Uno",
    gamertag: "UnoXXunO",
    correo: "Este es mi correo 1",
    fechaRegistro: "2022-04-12 18:33:07",
  },
  {
    id: 2,
    nombre: "Dos El Jugador",
    gamertag: "JugadorDosPrueba",
    correo: "Este es mi correo 2",
    fechaRegistro: "2022-11-27 05:13:45",
  },
  {
    id: 3,
    nombre: "Tres Jugador",
    gamertag: "TercerPrueba",
    correo: "Este es mi tercer correo",
    fechaRegistro: "2026-01-01 00:00:00",
  },
];

export function obtenerJugadores() {
  return jugadores;
}

export function registrarJugador(jugador) {
  jugadores.push(jugador);
}

export function determinarSiElGamertagExiste(gamertag) {
  return jugadores.some((jugador) => jugador.gamertag === gamertag);
}

export function buscarJugadorPorNombre(nombre) {
  return jugadores.find((jugador) => jugador.nombre === nombre);
}

export function buscarJugadorPorGamertag(gamertag) {
  return jugadores.find((jugador) => jugador.gamertag === gamertag);
}