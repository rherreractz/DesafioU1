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
  return (videojuegosDB || []).map((videojuego) => ({
    id: videojuego.id,
    nombre: videojuego.nombre,
    genero: videojuego.genero,
  }));
}

export async function registrarUnVideojuego(videojuego) {
  const nuevoVideojuego = {
    nombre: videojuego.nombre.trim(),
    genero: videojuego.genero.trim(),
  };

  // CORRECCIÓN CLAVE: Agregar 'await' porque determinarSiExisteElVideojuego es una función asíncrona
  const existeVideojuego = await determinarSiExisteElVideojuego(
    nuevoVideojuego.nombre
  );

  if (existeVideojuego) {
    throw new Error("El videojuego ya existe.");
  }

  await registrarVideojuego(nuevoVideojuego.nombre, nuevoVideojuego.genero);
}

export async function determinarSiExisteElVideojuego(nombre) {
  const videojuegos = await obtenerVideojuegos();
  if (!videojuegos || !Array.isArray(videojuegos)) return false;

  // Comparación insensible a mayúsculas/minúsculas
  return videojuegos.some(
    (v) => (v.nombre || "").toLowerCase() === nombre.toLowerCase()
  );
}