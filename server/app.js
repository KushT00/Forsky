// app.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
require('dotenv').config();

const userRoutes = require('./routes/routes');
const { addProducts } = require('./models/productModel');

// Enable CORS for all routes
app.use(cors());

// Ensure 'uploads/' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Define the directory to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the file naming convention
  }
});

// Optional: File filter to only allow certain file types (e.g., images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Reject the file
  }
};

// Create multer instance with storage configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Middleware to parse JSON
app.use(express.json());

// Routes with multer integration
app.post('/upload', upload.array('files', 10), (req, res) => { // 'files' is the name of the file input field, '10' is the max number of files
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }
  const fileNames = req.files.map(file => file.filename);
  res.send(`Files uploaded: ${fileNames.join(', ')}`);
});

// Product upload route
app.post('/api/products', upload.array('image', 5), async (req, res) => {
  try {
    const { name, description, price, stock_quantity, sub_categories, category_name } = req.body;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No images uploaded.');
    }

    const imageFiles = req.files.map(file => file.filename);

    // Handle missing or empty sub_categories
    let formattedSubCategories = '{}';  // Default to an empty array literal
    if (sub_categories) {
      formattedSubCategories = `{${sub_categories.split(',').map(item => `"${item.trim()}"`).join(',')}}`;
    }

    // Call the addProducts function to store product data in the database
    const product = await addProducts({
      name,
      description,
      price,
      stock_quantity,
      image: `{${imageFiles.join(',')}}`, // Save the image filenames as an array in the database
      sub_categories: formattedSubCategories,
      category_name
    });

    res.status(201).send({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use userRoutes for API routes
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Hello World!'));


// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// If `upload` is needed elsewhere, export it
module.exports = upload; // Optional: Only if you need to use `upload` in other files
