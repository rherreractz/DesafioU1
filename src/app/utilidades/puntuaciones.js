import {
  obtenerPuntajes,
  registrarPuntuacion,
} from "../../../DB/Puntuaciones/puntuaciones";
import { getVideojuegos } from "./videojuegos";
import { getJugadores } from "./jugadores";

export async function obtenerPuntuaciones() {
  const puntuaciones = await obtenerPuntajes();
  const puntajes = puntuaciones.map((puntuacion) => ({
    id: puntuacion.id,
    jugadorId: puntuacion.jugador_id,
    videojuegoId: puntuacion.videojuego_id,
    puntuacion: puntuacion.puntuacion,
    fecha: puntuacion.fecha,
  }));
  return puntajes;
}

export async function crearPuntuacion(puntuacion) {
  const nuevaPuntuacion = {
    jugadorId: puntuacion.jugadorId,
    videojuegoId: puntuacion.videojuegoId,
    puntuacion: puntuacion.puntuacion,
    fecha: new Date().toISOString(),
  };
  
  console.log("Nueva puntuación:", nuevaPuntuacion);
  
  const jugadores = await getJugadores();
  const videojuegos = await getVideojuegos();
  
  console.log("Jugadores:", jugadores);
  console.log("Videojuegos:", videojuegos);

  // Normalización a String para evitar fallos si el ID es number o string
  const jugadorValido = jugadores.some(
    (jugador) => String(jugador.id) === String(nuevaPuntuacion.jugadorId)
  );
  
  const videojuegoValido = videojuegos.some(
    (videojuego) => String(videojuego.id) === String(nuevaPuntuacion.videojuegoId)
  );

  if (!jugadorValido) {
    throw new Error("NOT_FOUND: El jugador especificado no existe.");
  }
  
  if (!videojuegoValido) {
    throw new Error("NOT_FOUND: El videojuego especificado no existe.");
  }

  // AWAIT OBLIGATORIO: Esperar a que la consulta SQL en MySQL finalice
  await registrarPuntuacion(
    nuevaPuntuacion.jugadorId,
    nuevaPuntuacion.videojuegoId,
    nuevaPuntuacion.puntuacion
  );

  return nuevaPuntuacion;
}