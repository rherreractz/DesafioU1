import db from '../db.js';

// Consultar todos los puntajes
export async function obtenerPuntajes() {
  const [rows] = await db.query('SELECT * FROM puntuaciones');
  return rows;
}

// Registrar puntuación (RF03 / RF05)
export async function registrarPuntuacion(jugador_id, videojuego_id, puntuacion) {
  const query = 'INSERT INTO puntuaciones (jugador_id, videojuego_id, puntuacion) VALUES (?, ?, ?)';
  const [result] = await db.query(query, [jugador_id, videojuego_id, puntuacion]);
  return result;
}

// Consultar Ranking / Clasificación (RF06)
export async function obtenerRanking() {
  const query = `
    SELECT 
      RANK() OVER (ORDER BY p.puntuacion DESC) AS posicion,
      j.gamertag AS jugador,
      v.nombre AS videojuego,
      p.puntuacion
    FROM puntuaciones p
    INNER JOIN jugadores j ON p.jugador_id = j.id
    INNER JOIN videojuegos v ON p.videojuego_id = v.id
    ORDER BY p.puntuacion DESC
  `;
  const [rows] = await db.query(query);
  return rows;
}

// Consultar Estadísticas Generales (RF08)
export async function obtenerEstadisticas() {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM jugadores) AS total_jugadores,
      (SELECT COUNT(*) FROM videojuegos) AS total_videojuegos,
      (SELECT COUNT(*) FROM puntuaciones) AS total_puntuaciones,
      (SELECT COALESCE(AVG(puntuacion), 0) FROM puntuaciones) AS puntuacion_promedio
  `;
  const [rows] = await db.query(query);
  return rows[0];
}