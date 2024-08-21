const pool = require('../db');

const fetchcart = async (req, res) => {
    const userId = req.params.userId;  // Get the user_id from the request parameters
  
    try {
      const cart = await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
      res.json(cart.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  module.exports = fetchcart;