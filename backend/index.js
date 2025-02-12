// Load environment variables
require('dotenv').config()

// Importing express module and creating an express app
const express = require('express')
const app = express()
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const swaggerSetup = require('./swagger'); // Adjust the path as necessary

// Set up Swagger
swaggerSetup(app);

// Port
const port = process.env.PORT || 3002 // Port can be changed in .env file

// Routes for the app
const todoRoutes = require('./routes/todo'); // Importing todo routes

// Middlewares
app.use(function (req, res, next) {
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );

  // Pass to next layer of middleware
  next();
});
app.use(express.json()) // For parsing application/json
// Cross Origin Resource Sharing
app.use(cors(corsOptions));


// Routes
// All routes starting with /api/todos will be handled by todoRoutes
app.use('/api/todos', todoRoutes); 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})