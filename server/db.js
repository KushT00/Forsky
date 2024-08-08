// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
  host: 'localhost',
  database: 'forsky',
  password: 'root',
  port: 5432,
});

module.exports = pool;
