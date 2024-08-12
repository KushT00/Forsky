// controllers/userController.js
const {  getCategory } = require('../models/categoryModel');

const fetchCategory = async (req, res) => {
  try {
    const users = await getCategory();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports = { fetchCategory };
