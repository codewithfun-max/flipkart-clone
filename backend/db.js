const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Password', // or your MySQL password
  database: 'flipkart',
});

module.exports = pool;