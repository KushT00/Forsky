// routes/userRoutes.js
const express = require('express');
const { fetchUsers,addUsers } = require('../controllers/userController');
const { fetchProducts } = require('../controllers/productController');
const { fetchOrders } = require('../controllers/orderController');
const { fetchCategory } = require('../controllers/categoryController');
const { fetchDiamonds } = require('../controllers/diamondsController');
const { fetchPlates} = require('../controllers/platesController');
const {putUser, delUser}= require('../models/userModel');
const { addPlates, putPlates, delPlates } = require('../models/platesModel');
const { addDiamonds, putDiamonds, delDiamonds } = require('../models/diamondsModel');
const { postCategory, putCategory, delCategory } = require('../models/categoryModel');

const router = express.Router();
const pool = require('../db');
const { delOrder, putOrder, addOrder } = require('../models/orderModel');
const { addProducts, putProducts, delProduct } = require('../models/productModel');

// users
router.get('/users', fetchUsers);
router.post('/users', addUsers);
router.put('/users/:user_id',putUser);
router.delete('/users/:user_id', delUser);
  

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
  


module.exports = router;
