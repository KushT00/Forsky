// controllers/userController.js
const {  getOrders } = require('../models/orderModel');

const fetchOrders = async (req, res) => {
  try {
    const users = await getOrders();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Products' });
  }
};

module.exports = { fetchOrders };
