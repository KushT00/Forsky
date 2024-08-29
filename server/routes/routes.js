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
const { postCategory, putCategory, delCategory, addSubCategory, deleteSubCategory } = require('../models/categoryModel');
const { delOrder, putOrder, addOrder } = require('../models/orderModel');
const { addProducts, putProducts, delProduct } = require('../models/productModel');
const {fetchcart, postCart, delCart} = require('../models/carModel');
// const postCart = require('../models/carModel')
const router = express.Router();
const db = require('../db');
const pool = require('../db');

const multer = require('multer');
const path = require('path');
// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique filenames
  }
});

// Initialize Multer with the storage configuration for multiple files
const upload = multer({ storage: storage }).array('image', 4);;


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
// router.post('/products',addProducts);
router.put('/products/:product_id', putProducts);
router.delete('/products/:product_id', delProduct);
router.get('/products/:product_id', async (req, res) => {
  const { product_id } = req.params;
  try {
    const user = await pool.query('SELECT * FROM products WHERE product_id = $1', [product_id]);
    if (user.rows.length === 0) {
      return res.status(404).send('product not found');
    }
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});  

// orders
router.get('/orders', fetchOrders);
router.post('/orders',addOrder);
router.put('/orders/:order_id', putOrder);
router.delete('/orders/:order_id', delOrder);
  

// categories
router.get('/categories', fetchCategory);
router.post('/categories', postCategory);
router.post('/sub', addSubCategory);
router.delete('/sub', deleteSubCategory);
router.put('/categories/:category_id',putCategory);
router.delete('/categories/:category_id', delCategory);


// diamonds
router.get('/diamonds', fetchDiamonds);
router.post('/diamonds',upload, addDiamonds);

router.put('/diamonds/:diamond_id', putDiamonds);
router.delete('/diamonds/:diamond_id',delDiamonds);
router.get('/diamonds/:id', async (req, res) => {
  const { id } = req.params; // Extract the diamond ID from the URL parameters
  try {
    // Query the database to find the diamond by its ID
    const result = await pool.query('SELECT * FROM diamonds WHERE diamond_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Diamond not found');
    }
    res.json(result.rows[0]); // Send the found diamond data as JSON
  } catch (err) {
    res.status(500).send(err.message); // Handle any errors
  }
});


// plates
router.get('/plates', fetchPlates);
router.post('/plates', addPlates);
router.put('/plates/:plate_id',putPlates);
router.delete('/plates/:plate_id',delPlates);
router.get('/plates/:plate_id', async (req, res) => {
  const { plate_id } = req.params;
  try {
    // Query the database to find the discount by its code
    const result = await pool.query('SELECT * FROM plates WHERE plate_id = $1', [plate_id]);
    if (result.rows.length === 0) {
      return res.status(404).send('CVD not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
  
//Discounts
router.get('/discounts', fetchdiscounts);
router.post('/discounts', postdiscounts);
router.put('/discounts/:discount_id',putdiscounts);
router.delete('/discounts/:discount_id', deldiscounts);
router.get('/discounts/:discount', async (req, res) => {
  const { discount } = req.params;
  try {
    // Query the database to find the discount by its code
    const result = await pool.query('SELECT * FROM discounts WHERE code = $1', [discount]);
    if (result.rows.length === 0) {
      return res.status(404).send('Discount code not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/prod/:product_id', async (req, res) => {
  const { product_id } = req.params;
  try {
    // Query the database to find the discount by its code
    const result = await pool.query('SELECT image FROM products WHERE product_id = $1', [product_id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Discount code not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// cart
router.get('/cart/:userId', fetchcart);
router.post('/cart', postCart);
router.get('/product-price/:product_type/:product_id', async (req, res) => {
  const { product_type, product_id } = req.params;
  let priceQuery;

  // Adjust the query based on product_type
  switch (product_type) {
    case 'plates':
      priceQuery = 'SELECT price FROM plates WHERE plate_id = $1';
      break;
      case 'products':
      priceQuery = 'SELECT price FROM products WHERE product_id = $1';
      break;
    case 'diamonds':
      priceQuery = 'SELECT price FROM diamonds WHERE diamond_id = $1';
      break;
    // Add more cases for other product types
    default:
      return res.status(400).json({ error: 'Invalid product type' });
  }

  try {
    const result = await db.query(priceQuery, [product_id]);
    if (result.rows.length > 0) {
      res.json({ price: result.rows[0].price });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product price:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/product-images/:product_type/:product_id', async (req, res) => {
  const { product_type, product_id } = req.params;
  let imagesQuery;
  let imageField = 'images'; // Default field name assumption

  // Adjust the query based on product_type
  switch (product_type) {
    case 'plates':
      imagesQuery = 'SELECT images FROM plates WHERE plate_id = $1';
      break;
    case 'products':
      imagesQuery = 'SELECT image FROM products WHERE product_id = $1';
      imageField = 'image'; // Override field name for products
      break;
    case 'diamonds':
      imagesQuery = 'SELECT images FROM diamonds WHERE diamond_id = $1';
      break;
    // Add more cases for other product types
    default:
      return res.status(400).json({ error: 'Invalid product type' });
  }

  try {
    const result = await db.query(imagesQuery, [product_id]);
    if (result.rows.length > 0) {
      const images = result.rows[0][imageField]; // Access the correct field name dynamically
      res.json({ images });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Define the DELETE route for removing an item from the cart
router.delete('/cart/:user_id', delCart);



module.exports = router;
