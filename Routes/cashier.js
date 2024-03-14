const Router = require('express').Router();
const POS_Order = require('../Models/POS_Order');
const Product = require('../Models/Product');
const Secret = process.env.SECRET;
require('dotenv').config();

//get all orders
Router.get('/orders', async (req, res) => {
    try {
        const orders = await POS_Order.find();
        return res.json(orders);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

//post an order
Router.post('/order', async (req, res) => {
    try {
        const order = new POS_Order({
            Customer_Name: req.body.Customer_Name,
            Items: req.body.Items,
            Total: req.body.Total,
            GST: req.body.GST,
            Grand_Total: req.body.Grand_Total,
            Status: req.body.Status,
            Date: req.body.Date,
            Payment_Method: req.body.Payment_Method,
            Payment_Done: req.body.Payment_Done,
            Branch_Name: req.body.Branch_Name
        });
        await order.save();
        return res.json(order);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

Router.patch('/order/:id', async (req, res) => {
    try {
        const order = await POS_Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.Status = req.body.Status;
        await order.save();
        return res.json(order);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
}
);

Router.patch('/order/payment/:id', async (req, res) => {
    try {
        const order = await POS_Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.Payment_Done = req.body.Payment_Done;
        await order.save();
        return res.json(order);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
}
);

exports = module.exports = Router;