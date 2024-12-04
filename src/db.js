const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'junction.proxy.rlwy.net', // Host público de Railway
  user: 'root',                    // Usuario
  password: 'qwNcRfJKajQXZussMZoQsDnJDdfHZLPs', // Contraseña
  port: 19000,                     // Puerto público
  database: 'railway',             // Base de datos
}).promise();

module.exports = pool;
