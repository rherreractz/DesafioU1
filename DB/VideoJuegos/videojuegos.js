import db from '../db.js';

// Consultar todos los videojuegos
export async function obtenerVideojuegos() {
  const [rows] = await db.query('SELECT id, nombre, genero FROM videojuegos');
  return rows;
}

// Registrar nuevo videojuego (RF02)
export async function registrarVideojuego(nombre, genero) {
  const query = 'INSERT INTO videojuegos (nombre, genero) VALUES (?, ?)';
  const [result] = await db.query(query, [nombre, genero]);
  return result;
}