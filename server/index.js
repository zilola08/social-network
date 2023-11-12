const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const models = require('./db_models/db_models');
//to be able to send requests from browser:
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
// to be able to parse json:
app.use(express.json());
app.use(cookieParser());
app.use('/api',router);

// Error handling always should be last
app.use(errorHandler);

const start = async () => {
  try {
    // connect to db:
    await sequelize.authenticate();
    // sync with our data-scheme
    await sequelize.sync();
    app.listen(PORT,() => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start();







