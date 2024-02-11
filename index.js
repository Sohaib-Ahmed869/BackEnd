const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const AdminRoutes = require('./Routes/admin');
const SuperAdminRoutes = require('./Routes/SuperAdmin');
const CategoryRoutes = require('./Routes/category');
const CustomerRouters = require('./Routes/user');

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/theWrapSpot')
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());


// Import routes
app.use('/admin', AdminRoutes);
app.use('/superadmin', SuperAdminRoutes);
app.use('/category', CategoryRoutes);
app.use('/user', CustomerRouters);



app.listen(port, () => console.log(`Server running on port ${port}`));

