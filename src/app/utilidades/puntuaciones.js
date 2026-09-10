export const puntuaciones = [
  {
    id: 1,
    jugadorId: 1,
    videojuegoId: 1,
    puntuacion: 100,
    fecha: new Date().toISOString(),
  },
  {
    id: 2,
    jugadorId: 2,
    videojuegoId: 2,
    puntuacion: 200,
    fecha: new Date().toISOString(),
  },
  {
    id: 3,
    jugadorId: 3,
    videojuegoId: 3,
    puntuacion: 300,
    fecha: new Date().toISOString(),
  },
  {
    id: 4,
    jugadorId: 1,
    videojuegoId: 2,
    puntuacion: 400,
    fecha: new Date().toISOString(),
  },
  {
    id: 5,
    jugadorId: 2,
    videojuegoId: 3,
    puntuacion: 500,
    fecha: new Date().toISOString(),
  },
];

export function obtenerPuntuaciones() {
  return puntuaciones;
}

export function crearPuntuacion(puntuacion) {
  const nuevaPuntuacion = {
    id: puntuaciones.length + 1,
    jugadorId: puntuacion.jugadorId,
    videojuegoId: puntuacion.videojuegoId,
    puntuacion: puntuacion.puntuacion,
    fecha: new Date().toISOString(),
  };
  puntuaciones.push(nuevaPuntuacion);
  return nuevaPuntuacion;
}
