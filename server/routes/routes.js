// routes/userRoutes.js
const express = require('express');
const { fetchUsers,addUsers } = require('../controllers/userController');
const { fetchProducts } = require('../controllers/productController');
const { fetchOrders } = require('../controllers/orderController');
const { fetchCategory } = require('../controllers/categoryController');
const { fetchDiamonds } = require('../controllers/diamondsController');
const { fetchPlates} = require('../controllers/platesController');
const {putUser, delUser, loginUser}= require('../models/userModel');
const { addPlates, putPlates, delPlates } = require('../models/platesModel');
const { addDiamonds, putDiamonds, delDiamonds } = require('../models/diamondsModel');
const { postCategory, putCategory, delCategory, addSubCategory } = require('../models/categoryModel');
const { delOrder, putOrder, addOrder } = require('../models/orderModel');
const { addProducts, putProducts, delProduct } = require('../models/productModel');

const router = express.Router();
const pool = require('../db');
const { fetchdiscounts, postdiscounts, putdiscounts, deldiscounts } = require('../models/discountModel');

// users
router.get('/users', fetchUsers);
router.post('/users', addUsers);
router.post('/login', loginUser);
router.put('/users/:user_id',putUser);
router.delete('/users/:user_id', delUser);
// Get a single user by ID
router.get('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
      const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
      if (user.rows.length === 0) {
        return res.status(404).send('User not found');
      }
      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

// products
router.get('/products', fetchProducts);
router.post('/products',addProducts);
router.put('/products/:product_id', putProducts);
router.delete('/products/:product_id', delProduct);
  

// orders
router.get('/orders', fetchOrders);
router.post('/orders',addOrder);
router.put('/orders/:order_id', putOrder);
router.delete('/orders/:order_id', delOrder);
  

// categories
router.get('/categories', fetchCategory);
router.post('/categories', postCategory);
router.post('/sub', addSubCategory);
router.put('/categories/:category_id',putCategory);
router.delete('/categories/:category_id', delCategory);


// diamonds
router.get('/diamonds', fetchDiamonds);
router.post('/diamonds', addDiamonds);
router.put('/diamonds/:diamond_id', putDiamonds);
router.delete('/diamonds/:diamond_id',delDiamonds);


// plates
router.get('/plates', fetchPlates);
router.post('/plates', addPlates);
router.put('/plates/:plate_id',putPlates);
router.delete('/plates/:plate_id',delPlates);
  
//Discounts
router.get('/discounts', fetchdiscounts);
router.post('/discounts', postdiscounts);
router.put('/discounts/:discount_id',putdiscounts);
router.delete('/discounts/:discount_id', deldiscounts);

module.exports = router;
