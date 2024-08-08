// models/userModel.js
const pool = require('../db');

const getUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = { getUsers };
