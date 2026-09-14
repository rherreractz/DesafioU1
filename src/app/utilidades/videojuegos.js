/*
Objeto JSON Videojuego: {
id: number;
nombre: string;
genero: string;
}
*/
import {
  obtenerVideojuegos,
  registrarVideojuego,
} from "../../../DB/VideoJuegos/videojuegos";

export async function getVideojuegos() {
  const videojuegosDB = await obtenerVideojuegos();
  const videojuegos = videojuegosDB.map((videojuego) => ({
    id: videojuego.id,
    nombre: videojuego.nombre,
    genero: videojuego.genero,
  }));
  return videojuegos;
}

export async function registrarUnVideojuego(videojuego) {
  const nuevoVideojuego = {
    nombre: videojuego.nombre,
    genero: videojuego.genero,
  };
  const existeVideojuego = determinarSiExisteElVideojuego(
    nuevoVideojuego.nombre
  );
  if (existeVideojuego) {
    throw new Error("El videojuego ya existe.");
  }
  await registrarVideojuego(nuevoVideojuego.nombre, nuevoVideojuego.genero);
}

export async function determinarSiExisteElVideojuego(nombre) {
  const videojuegos = await obtenerVideojuegos();
  return videojuegos.some((v) => v.nombre === nombre);
}
