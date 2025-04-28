const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use(express.json());


app.use(userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
