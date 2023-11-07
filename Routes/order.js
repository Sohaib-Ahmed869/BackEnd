const Router = require('express').Router();
const ProductModel = require('../Models/Product');
const Product = ProductModel.Product;
const OrderModel = require('../Models/Order');
const Order = OrderModel.Order;
const auth = require('./Auth');
const UserAuth = require('../Routes/UserAuth');

Router.get('/', auth, (req, res) => {

    Order.find()
    .then((orders) => {
        res.json(orders);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.get('/:id', UserAuth,  (req, res) => {
    Order.findById(req.params.id)
    .then((order) => {
        //check if order is by the same user
        if (order.Customer_Phone != req.user.Phone) {
            res.status(401).json({ message: "Unauthorized" });
        }
        else {
            res.json(order);
        }
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.post('/', (req, res) => {

    const newOrder = new Order({
        Order_Id: req.body.Order_Id,
        Customer_Name: req.body.Customer_Name,
        Customer_Address: req.body.Customer_Address,
        Customer_Phone: req.body.Customer_Phone,
        Items: req.body.Items,
        Total: req.body.Total,
        GST: req.body.GST,
        Status: req.body.Status,
        Date: req.body.Date,
        Time: req.body.Time,
        Payment_Method: req.body.Payment_Method,
        Ordered_From: req.body.Ordered_From,
        Branch_Name: req.body.Branch_Name,
    });
    newOrder.save()
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.delete('/:id', auth, (req, res) => {
    Order.findByIdAndDelete(req.params.id)
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.put('/:id', auth, (req, res) => {

    Order.findByIdAndUpdate(req.params.id, req.body)
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        res.send(err);
    });
});

module.exports = Router;