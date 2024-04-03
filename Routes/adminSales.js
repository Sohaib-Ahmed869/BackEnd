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
        let orderss = await POS_Order.find({});
        //filter the orders so that they are only the ones with pending and completed status
        orderss = orderss.filter(order => {
            return order.Status === 'Delivered' || order.Status === 'Completed';
        });
        const orders = orderss.filter(order => {
            // Extract the date portion of the order's Date field
            const orderDate = order.Date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Check if the order's date matches the provided date
            return orderDate === date;
        });
        let number_of_orders = orders.length;
        let total = 0;
        let cardTotal = 0;
        let cashTotal = 0;
        orders.forEach(order => {
            total += order.Total;
            if (order.Payment_Method === 'Card') {
                cardTotal += order.Total;
            }
            else if (order.Payment_Method === 'Cash') {
                cashTotal += order.Total;
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
        let orderss = await POS_Order.find({});
        //filter the orders so that they are only the ones with pending and completed status
        orderss = orderss.filter(order => {
            return order.Status === 'Delivered' || order.Status === 'Completed';
        });
        const filteredOrders = orderss.filter(order => {
            const orderMonth = order.Date.toISOString().split('-')[1]; // Extract the month portion of the order's Date field
            return orderMonth == month;
        });

        let total = 0;
        filteredOrders.forEach(order => {
            total += order.Total;
        });
        let number_of_orders = filteredOrders.length;
        let cardTotal = 0;
        let cashTotal = 0;
        filteredOrders.forEach(order => {
            if (order.Payment_Method === 'Card') {
                cardTotal += order.Total;
            }
            else if (order.Payment_Method === 'Cash') {
                cashTotal += order.Total;
            }
        });
        return res.json({ Total: total, Card: cardTotal, Cash: cashTotal, Number_of_Orders: number_of_orders });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

//get the total sales by year
Router.get('/sales/year/:year', async (req, res) => {
    try {
        const year = req.params.year;
        let orderss = await POS_Order.find({});
        //filter the orders so that they are only the ones with pending and completed status
        orderss = orderss.filter(order => {
            return order.Status === 'Delivered' || order.Status === 'Completed';
        });
        const filteredOrders = orderss.filter(order => {
            const orderYear = order.Date.toISOString().split('-')[0]; // Extract the year portion of the order's Date field
            return orderYear == year;
        });

        let total = 0;
        filteredOrders.forEach(order => {
            total += order.Total;
        });
        let number_of_orders = filteredOrders.length;
        let cardTotal = 0;
        let cashTotal = 0;
        filteredOrders.forEach(order => {
            if (order.Payment_Method === 'Card') {
                cardTotal += order.Total;
            }
            else if (order.Payment_Method === 'Cash') {
                cashTotal += order.Total;
            }
        });
        return res.json({ Total: total, Card: cardTotal, Cash: cashTotal, Number_of_Orders: number_of_orders });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

// Function to calculate most sold product
const getMostSoldProductbyDate = async (date) => {
    try {

        let orderss = await POS_Order.find({});
        //filter the orders so that they are only the ones with delivered and completed status
        orderss = orderss.filter(order => {
            return order.Status === 'Delivered' || order.Status === 'Completed';
        });
        const orders = orderss.filter(order => {
            // Extract the date portion of the order's Date field
            const orderDate = order.Date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Check if the order's date matches the provided date
            return orderDate === date;
        });


        if (orders.length === 0) {
            return [];
        }

        const itemsOverall = [];


        // Iterate over orders and items to count quantities
        orders.forEach(order => {
            order.Items.forEach(item => {
                const itemId = item._id;
                const itemQuantity = item.quantity;
                const itemName = item.Name;
                const itemPrice = item.Price;

                // If the item is already in the object, add the quantity
                if (itemsOverall[itemName]) {
                    itemsOverall[itemName].quantity += itemQuantity;
                    itemsOverall[itemName].sales += itemQuantity * itemPrice;
                    return;
                }
                else {
                    itemsOverall[itemName] = {
                        quantity: itemQuantity,
                        sales: itemQuantity * itemPrice,
                        name: itemName
                    };
                }
            });
        });




                

        // return the items sorted by quantity
        const sortedItems = [];
        for (const item in itemsOverall) {
            sortedItems.push({
                quantity: itemsOverall[item].quantity,
                sales: itemsOverall[item].sales,
                name: itemsOverall[item].name
            });
        }


        console.log(sortedItems)
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
            const orderDate = order.Date.toISOString().split('-')[1]; // Format: MM
            // Check if the order's date matches the provided date
            return orderDate.includes(month);
        });

        if (orders.length === 0) {
            return [];
        }

        const itemsOverall = [];
        // Iterate over orders and items to count quantities
        orders.forEach(order => {
            order.Items.forEach(item => {
                const itemId = item._id;
                const itemQuantity = item.quantity;
                const itemName = item.Name;
                const itemPrice = item.Price;

                // check by name
                if (itemsOverall[itemName]) {
                    itemsOverall[itemName].quantity += itemQuantity;
                    itemsOverall[itemName].sales += itemQuantity * itemPrice;
                    return;
                }
                else {
                    itemsOverall[itemName] = {
                        quantity: itemQuantity,
                        sales: itemQuantity * itemPrice,
                        name: itemName
                    };
                }
            }
            );

        });

        // return the items sorted by quantity
        const sortedItems = [];
        for (const item in itemsOverall) {
            sortedItems.push({
                quantity: itemsOverall[item].quantity,
                sales: itemsOverall[item].sales,
                name: itemsOverall[item].name
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

        const itemsOverall = [];
        // Iterate over orders and items to count quantities
        orders.forEach(order => {
            order.Items.forEach(item => {
                const itemId = item._id;
                const itemQuantity = item.quantity;
                const itemName = item.Name;
                const itemPrice = item.Price;

                // If the item is already in the object, add the quantity
                if (itemsOverall[itemName]) {
                    itemsOverall[itemName].quantity += itemQuantity;
                    itemsOverall[itemName].sales += itemQuantity * itemPrice;
                    return;
                }
                else {
                    itemsOverall[itemName] = {
                        quantity: itemQuantity,
                        sales: itemQuantity * itemPrice,
                        name: itemName
                    };
                }
            });
        }

        );

        // return the items sorted by quantity
        const sortedItems = [];
        for (const item in itemsOverall) {
            sortedItems.push({
                quantity: itemsOverall[item].quantity,
                sales: itemsOverall[item].sales,
                name: itemsOverall[item].name
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