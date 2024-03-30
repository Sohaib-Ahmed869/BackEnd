const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const AdminModel = require('../Models/Administration');
const ProductModel = require('../Models/Product');
const CustomerModel = require('../Models/Customer');
const POS_Order = require('../Models/POS_Order');

const Secret = process.env.SECRET;

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

//get the total sales by date
Router.get('/sales/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const orderss = await POS_Order.find({});
        const orders = orderss.filter(order => {
            // Extract the date portion of the order's Date field
            const orderDate = order.Date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Check if the order's date matches the provided date
            return orderDate === date;
        });
        console.log(orders);
        let number_of_orders = orders.length;
        let total = 0;
        let cardTotal = 0;
        let cashTotal = 0;
        orders.forEach(order => {
            total += order.Grand_Total;
            if (order.Payment_Method === 'Card') {
                cardTotal += order.Grand_Total;
            }
            else {
                cashTotal += order.Grand_Total;
            }
        });
        return res.json({ Total: total, Card: cardTotal, Cash: cashTotal, Number_of_Orders: number_of_orders });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});


//get the total sales by month
Router.get('/sales/month/:month', async (req, res) => {
    try {
        const month = req.params.month;
        const orders = await POS_Order.find({ Date: { $regex: month } });
        let total = 0;
        orders.forEach(order => {
            total += order.Grand_Total;
        });
        return res.json({ total });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

//get the total sales by year
Router.get('/sales/year/:year', async (req, res) => {
    try {
        const year = req.params.year;
        const orders = await POS_Order.find({ Date: { $regex: year } });
        let total = 0;
        orders.forEach(order => {
            total += order.Grand_Total;
        });
        return res.json({ total });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});


// Function to calculate most sold product
const getMostSoldProductbyDate = async (date) => {
    try {

        const orderss = await POS_Order.find({});
        const orders = orderss.filter(order => {
            // Extract the date portion of the order's Date field
            const orderDate = order.Date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Check if the order's date matches the provided date
            return orderDate === date;
        });


        if (orders.length === 0) {
            return null;
        }

        const itemQuantities = {}; // Object to store item quantities

        // Iterate over orders and items to count quantities
        orders.forEach(order => {
            console.log(order.Items)
            order.Items.forEach(item => {

                const itemId = item.item;
                const itemQuantity = item.quantity;

                console.log(itemId)
                console.log(itemQuantity)
                // If the item is already in the object, add the quantity
                if (itemQuantities[itemId]) {
                    itemQuantities[itemId] += itemQuantity;
                    return;
                }
                else {
                    itemQuantities[itemId] = itemQuantity;
                }
            });
        });

        // return the items sorted by quantity
        const sortedItems = [];
        for (const item in itemQuantities) {
            const product = await ProductModel.findById(item);
            const name = product.Name;
            sortedItems.push({
                name: product.Name,
                quantity: itemQuantities[item],
                sales: itemQuantities[item] * product.Price
            });
        }
        //sort the items by quantity
        sortedItems.sort((a, b) => {
            return b.quantity - a.quantity;
        });
        return sortedItems;
    } catch (error) {
        console.error('Error', error.message);
        return null;
    }
};


// Route to get most sold product by date
Router.get('/mostsold/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const result = await getMostSoldProductbyDate(date);
        if (!result) {
            return res.status(404).json({ error: 'No data found for the given date' });
        }
        return res.json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

// Function to calculate most sold product by month
const getMostSoldProductbyMonth = async (month) => {
    try {
        const orderss = await POS_Order.find({});
        const orders = orderss.filter(order => {
            // Extract the date portion of the order's Date field
            const orderDate = order.Date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Check if the order's date matches the provided date
            return orderDate.includes(month);
        });

        if (orders.length === 0) {
            return null;
        }

        const itemQuantities = {}; // Object to store item quantities

        // Iterate over orders and items to count quantities
        orders.forEach(order => {
            order.Items.forEach(item => {
                const itemId = item.item;
                const itemQuantity = item.quantity;

                // If the item is already in the object, add the quantity
                if (itemQuantities[itemId]) {
                    itemQuantities[itemId] += itemQuantity;
                    return;
                }
                else {
                    itemQuantities[itemId] = itemQuantity;
                }
            });
        });

        // return the items sorted by quantity
        const sortedItems = [];
        for (const item in itemQuantities) {
            const product = await ProductModel.findById(item);
            const name = product.Name;
            sortedItems.push({
                name: product.Name,
                quantity: itemQuantities[item],
                sales: itemQuantities[item] * product.Price
            });
        }
        //sort the items by quantity
        sortedItems.sort((a, b) => {
            return b.quantity - a.quantity;
        });

        return sortedItems;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

// Route to get most sold product by month
Router.get('/mostsold/month/:month', async (req, res) => {
    try {
        const month = req.params.month;
        const result = await getMostSoldProductbyMonth(month);
        if (!result) {
            return res.status(404).json({ error: 'No data found for the given month' });
        }
        return res.json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

// Function to calculate most sold products of all time
const getMostSoldProduct = async () => {
    try {
        const orders = await POS_Order.find();
        if (orders.length === 0) {
            return null;
        }

        const itemQuantities = {}; // Object to store item quantities

        // Iterate over orders and items to count quantities
        orders.forEach(order => {
            order.Items.forEach(item => {
                const itemId = item.item;
                const itemQuantity = item.quantity;

                // If the item is already in the object, add the quantity
                if (itemQuantities[itemId]) {
                    itemQuantities[itemId] += itemQuantity;
                    return;
                }
                else {
                    itemQuantities[itemId] = itemQuantity;
                }
            });
        });

        // return the items sorted by quantity
        const sortedItems = [];
        for (const item in itemQuantities) {
            const product = await ProductModel.findById(item);
            const name = product.Name;
            sortedItems.push(
                {
                    name: product.Name,
                    quantity: itemQuantities[item],
                    sales: itemQuantities[item] * product.Price
                }
            );

        }
        //sort the items by quantity
        sortedItems.sort((a, b) => {
            return b.quantity - a.quantity;
        });
        return sortedItems;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

// Route to get most sold products of all time
Router.get('/mostsold', async (req, res) => {
    try {
        const result = await getMostSoldProduct();
        if (!result) {
            return res.status(404).json({ error: 'No data found' });
        }
        return res.json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});


module.exports = Router;