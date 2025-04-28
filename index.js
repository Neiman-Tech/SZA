const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');  

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use(express.json());


app.use(userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
