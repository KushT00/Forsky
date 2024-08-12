// models/userModel.js
const pool = require('../db');

const getOrders = async () => {
  try {
    const res = await pool.query('SELECT * FROM orders ORDER BY order_date DESC, order_time DESC');
    return res.rows;
  } catch (err) {
    throw err;
  }
};
const addOrder= async (req, res) => {
  const { user_id, order_date, status, total_amount, discount_id } = req.body;
  try {
    const newOrder = await pool.query(
      'INSERT INTO orders (user_id, order_date, status, total_amount, discount_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, order_date, status, total_amount, discount_id]
    );
    res.json(newOrder.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const putOrder=async (req, res) => {
  const { order_id } = req.params;
  const { user_id, order_date, status, total_amount, discount_id } = req.body;
  try {
    const updatedOrder = await pool.query(
      'UPDATE orders SET user_id = $1, order_date = $2, status = $3, total_amount = $4, discount_id = $5 WHERE order_id = $6 RETURNING *',
      [user_id, order_date, status, total_amount, discount_id, order_id]
    );
    if (updatedOrder.rows.length === 0) {
      return res.status(404).send('Order not found');
    }
    res.json(updatedOrder.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
const delOrder=async (req, res) => {
  const { order_id } = req.params;
  try {
    const deletedOrder = await pool.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [order_id]);
    if (deletedOrder.rows.length === 0) {
      return res.status(404).send('Order not found');
    }
    res.send(`Order with order_id ${order_id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getOrders,delOrder,putOrder,addOrder };
