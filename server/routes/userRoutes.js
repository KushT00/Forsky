// routes/userRoutes.js
const express = require('express');
const { fetchUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/users', fetchUsers);

module.exports = router;
