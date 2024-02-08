const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const AdminRoutes = require('./Routes/admin');
const SuperAdminRoutes = require('./Routes/SuperAdmin');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/theWrapSpot')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());


// Import routes
app.use('/admin', AdminRoutes);
app.use('/superadmin', SuperAdminRoutes);



app.listen(port, () => console.log(`Server running on port ${port}`));

