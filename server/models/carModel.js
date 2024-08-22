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

const postCart =  async (req, res) => {
    const { user_id, product_type, product_id, product_name } = req.body;
  
    if (!user_id || !product_type || !product_id || !product_name ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO cart (user_id, product_type, product_id, product_name ) VALUES ($1, $2, $3, $4 ) RETURNING *',
        [user_id, product_type, product_id, product_name ]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
module.exports = { fetchcart,postCart};
