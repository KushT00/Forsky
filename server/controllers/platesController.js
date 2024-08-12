// controllers/userController.js
const {  getPlates } = require('../models/platesModel');

const fetchPlates = async (req, res) => {
  try {
    const users = await getPlates();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Diamonds ' });
  }
};

module.exports = { fetchPlates };
