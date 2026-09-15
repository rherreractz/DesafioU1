import db from '../db.js';

// Consultar todos los jugadores (RF04)
export async function obtenerJugadores() {
  const [rows] = await db.query('SELECT id, nombre, gamertag, email, fecha_registro FROM jugadores');
  return rows;
}

// Buscar jugador por Nombre o Gamertag (RF07)
export async function buscarJugador(busqueda) {
  const query = `
    SELECT id, nombre, gamertag, email, fecha_registro 
    FROM jugadores 
    WHERE nombre LIKE CONCAT('%', ?, '%') OR gamertag LIKE CONCAT('%', ?, '%')
  `;
  const [rows] = await db.query(query, [busqueda, busqueda]);
  return rows;
}

// Registrar nuevo jugador (RF01)
export async function registrarJugador(nombre, gamertag, email) {
  const query = 'INSERT INTO jugadores (nombre, gamertag, email) VALUES (?, ?, ?)';
  const [result] = await db.query(query, [nombre, gamertag, email]);
  return result;
}