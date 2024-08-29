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

  const postCart = async (req, res) => {
    const { user_id, product_type, product_id, product_name } = req.body;

    if (!user_id || !product_type || !product_id || !product_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if the item already exists in the cart for the given user_id, product_type, and product_id
        const existingItem = await pool.query(
            'SELECT * FROM cart WHERE user_id = $1 AND product_type = $2 AND product_id = $3',
            [user_id, product_type, product_id]
        );

        // If the item already exists, return a 409 Conflict response
        if (existingItem.rows.length > 0) {
            return res.status(409).json({ error: 'Item already added to cart' });
        }

        // If the item doesn't exist, proceed to add it to the cart
        const result = await pool.query(
            'INSERT INTO cart (user_id, product_type, product_id, product_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, product_type, product_id, product_name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const delCart = async (req, res) => {
  const { user_id } = req.params; // Get the user_id from the request parameters
  const { product_id, product_type } = req.body; // Get other fields from the request body

  // Check if required fields are provided
  if (!user_id || !product_id || !product_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Perform the deletion from the cart table
    const result = await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 AND product_type = $3 RETURNING *',
      [user_id, product_id, product_type]
    );

    // Check if the deletion was successful
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Respond with the deleted item details
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = { fetchcart,postCart, delCart};
