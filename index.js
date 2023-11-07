const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// add routes
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));
app.use('/category', require('./routes/category'));
app.use('/order', require('./routes/order'));
//app.use('/manager', require('./routes/manager'));

app.use((err, req, res, next) => {
    res.status(422).send({error: "No such route found!"});
});

// Listen to port
app.listen(port, () => console.log(`Listening to port ${port}`));