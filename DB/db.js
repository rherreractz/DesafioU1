import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql8001.site4now.net',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'a34a77_torneovideojuegos',
  password: process.env.DB_PASSWORD || 'Qwer1234@',
  database: process.env.DB_NAME || 'db_a34a77_torneovideojuegos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});

export default pool;