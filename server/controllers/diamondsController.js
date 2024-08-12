// controllers/userController.js
const {  getDiamonds } = require('../models/diamondsModel');

const fetchDiamonds = async (req, res) => {
  try {
    const users = await getDiamonds();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Diamonds ' });
  }
};

module.exports = { fetchDiamonds };
