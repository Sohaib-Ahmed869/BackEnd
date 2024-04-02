const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
var admin = require("firebase-admin");
const serviceAccount = require('./service_keys.json.json');
const path = require('path');
require('dotenv').config();


const AdminRoutes = require('./Routes/admin');
const SuperAdminRoutes = require('./Routes/SuperAdmin');
const CategoryRoutes = require('./Routes/category');
const CustomerRouters = require('./Routes/user');
const TaxRouters = require('./Routes/Tax');
const POS_Order_Routes = require('./Routes/cashier');
const OrderRoutes = require('./Routes/order');
const ProductRoutes = require('./Routes/product');
const SalesRoutes = require('./Routes/adminSales');

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/theWrapSpot')
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: '*',
  }));

app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
}
);

let firebaseStorage = null;

const initializeFunction = () => {
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "gs://bawarchi-61209.appspot.com"
    });
    console.log('Firebase Initialized');
    firebaseStorage = admin.storage();

}

}

initializeFunction();




// Import routes
app.use('/admin', AdminRoutes);
app.use('/superadmin', SuperAdminRoutes);
app.use('/category', CategoryRoutes);
app.use('/user', CustomerRouters);
app.use('/tax', TaxRouters);
app.use('/cashier', POS_Order_Routes);
app.use('/', CustomerRouters);
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);
app.use('/sales', SalesRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));