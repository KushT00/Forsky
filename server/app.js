const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

const userRoutes = require('./routes/routes');

// Enable CORS for all routes
app.use(cors());

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the directory to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the file naming convention
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

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

// Use userRoutes for API routes
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
