const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;
require('dotenv').config();

const userRoutes = require('./routes/routes');

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
