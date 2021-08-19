/** @format */

const express = require('express');

const logger = require('./middleware/logger');
const PORT = process.env.PORT || 8001;

const datas = require('./test_database');

const app = express();

//Logger middleware
app.use(logger);

// Body-parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Login Routes
app.use('/login', require('./routes/app/login'));

//API Routes
app.use('/api', require('./routes/app/api'));

app.listen(PORT, '127.0.0.2', () =>
  console.log(`Server started on port ${PORT}`)
);
