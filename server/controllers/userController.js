// controllers/userController.js
const { getUsers,postUser } = require('../models/userModel');

const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
const addUsers = async (req, res) => {
  try {
    const users = await postUser(req, res);  // Pass req and res to postUser
    res.status(200).json(users);
  } catch (err) {
    
  }
}

module.exports = { fetchUsers,addUsers };
