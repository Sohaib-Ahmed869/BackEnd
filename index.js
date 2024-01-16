const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const AdminRoutes = require('./Routes/admin');




// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/theWrapSpot')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());


// Import routes
app.use('/admin', AdminRoutes);



app.listen(port, () => console.log(`Server running on port ${port}`));

