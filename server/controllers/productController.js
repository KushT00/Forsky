// controllers/userController.js
const { getProducts } = require('../models/productModel');

const fetchProducts = async (req, res) => {
  try {
    const users = await getProducts();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Products' });
  }
};

module.exports = { fetchProducts };
