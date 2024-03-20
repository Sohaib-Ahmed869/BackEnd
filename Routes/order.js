const Router = require('express').Router();
const ProductModel = require('../Models/Product');
const Product = ProductModel.Product;
const Order = require('../Models/Order');
const auth = require('../Middlewares/Auth/auth');
const UserAuth = require('../Middlewares/Auth/userAuth');

Router.get('/', (req, res) => {

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
        Customer_Name: req.body.Customer_Name,
        Customer_Address: req.body.Customer_Address,
        Customer_Phone: req.body.Customer_Phone,
        Items: req.body.Items,
        Total: req.body.Total,
        Grand_Total: req.body.Grand_Total,
        GST: req.body.GST,
        Ordered_From: req.body.Ordered_From,
        Branch_Name: req.body.Branch_Name,
        Delivery_Charges: req.body.Delivery_Charges,
        Comment: req.body.Comment || ''
    });

    newOrder.save()
    .then((order) => {
        res.status(200).json(order._id);
    })
    .catch((err) => {
        res.status(500).json({ message: err });
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