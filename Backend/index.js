const express = require('express');

const app = express();

require('dotenv').config();
require('./Models/db');

const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter=require('./Routes/ProductRouter')

// Middleware
const bodyParser = require('body-parser');
const cors = require('cors');

// Set the PORT
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Register the AuthRouter
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Ping route for testing
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.....`);
});
