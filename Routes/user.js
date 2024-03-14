const Router = require('express').Router();
const User = require('../Models/Customer');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../Routes/UserAuth');
const Product = require('../Models/Product');
const Secret = process.env.SECRET;
require('dotenv').config();


//=========================================================Product Routes=========================================================
//get all products
Router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});




//admin signup and login
Router.get('/fav/:id', UserAuth, (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            res.json(user.Favourite_Products);
        })
        .catch((err) => {
            res.send(err);
        });
});

Router.post('/fav/:id', UserAuth, (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.Favourite_Products.push(req.body.Product_Id);
            user.save()
                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    res.send(err);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

Router.delete('/fav/:id', UserAuth, (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            //confirm 
            user.Favourite_Products.pull(req.body.Product_Id);
            user.save()
                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    res.send(err);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});



Router.post('/register', async (req, res) => {
    try {

        const checkUser = await User.findOne({ Email: req.body.email });
        if (checkUser) {
            return res.status(400).json({ error: 'User already exists' });
        }


        const user = new User({
            Name: req.body.name,
            Password: await bcrypt.hash(req.body.password, 10),
            Email: req.body.email,
            Phone: req.body.phone,
            Address: req.body.address,
            Favourite_Products: [],
            Status: 'Active'
            //insert image
        });

        await user.save();

        //generate token

        const token = jwt.sign({ Name: user.Name, Password: user.Password }, Secret);
        return res.json({ token });
    }
    catch (err) {
        console.log('Error in registration');
        return res.json(err.message);

    }
});

Router.post('/login', async (req, res) => {
    const { Phone, Password } = req.body;

    try {
        const user = await User.findOne({ Phone });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        //generate token
        const token = jwt.sign({ id: user._id, name: user.name }, Secret);
        await user.save();

        return res.json({ token });


    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ error: 'Invalid credentials' });
    }

});


module.exports = Router;