const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');  
const path = require('path');

const app = express();
app.use(express.static('public'));
const port = 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use(express.json());


app.use(userRoutes);
app.get("/",(req,res) => {


	res.sendFile(path.join(__dirname,'public','index.html'));

});

app.get('/signup', (req,res) => { 
	res.sendFile(path.join(__dirname,'public','signup.html'));
});
app.get('/login',(req,res) => {
	res.sendFile(path.join(__dirname,'public','login.html'));

});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
