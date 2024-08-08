const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
