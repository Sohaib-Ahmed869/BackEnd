const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/theWrapSpot')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());

// add routes
app.use('/admin', require('./Routes/admin'));
app.use('/user', require('./Routes/user'));
app.use('/product', require('./Routes/product'));
app.use('/category', require('./Routes/category'));
app.use('/order', require('./Routes/order'));
//app.use('/manager', require('./routes/manager'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));