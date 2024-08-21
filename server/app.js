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
const uploadDir = '../uploads/';
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
app.post('/upload', upload.single('file'), (req, res) => {
  // `file` is the name of the file input field
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded: ${req.file.filename}`);
});
// Routes with multer integration

// Route to handle product data and image upload
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock_quantity, sub_categories, category_name } = req.body;

    // Check if an image was uploaded
    if (!req.file) {
      return res.status(400).send('No image uploaded.');
    }

    // Convert sub_categories to a PostgreSQL array literal
    const formattedSubCategories = `{${sub_categories.split(',').map(item => `"${item}"`).join(',')}}`;

    // Call the addProducts function to store product data in the database
    const product = await addProducts({
      name,
      description,
      price,
      stock_quantity,
      image: req.file.filename, // Save the image filename in the database
      sub_categories: formattedSubCategories,
      category_name
    });

    res.status(201).send({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Use userRoutes for API routes
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
