const mysql = require('mysql');

// Set database connection credentials
const config = {
  host: 'remotemysql.com',
  user: 'Anji0dgzzZ',
  password: 'WpWKzmOvkw',
  database: 'Anji0dgzzZ',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;
