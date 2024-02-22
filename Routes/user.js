const Router = require('express').Router();
const { model } = require('mongoose');
const User = require('../Models/Customer');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const path = require('path');
const util = require('util');
const UserAuth = require('../Routes/UserAuth');
const Secret = process.env.SECRET;
require('dotenv').config();
Router.use(fileUpload());





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
        console.log(req.body);
        const checkUser = await User.findOne({ Phone: req.body.phone });
        if (checkUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const pass= await bcrypt.hash(req.body.password, 10);
        const user = new User({
            Name: req.body.name,
            Password: pass,
            // Email: req.body.email,
            Phone: req.body.phone,
            // Address: req.body.address,
            Favourite_Products: [],
            Status: 'Active'
            //insert image
        });

        await user.save();


        //generate token

        const token = jwt.sign({ Name: user._id, Password: user.Password }, Secret);
        return res.json({ token });
    }
    catch (err) {
        console.log('Error in registration');
        return res.json(err.message);

    }
});

Router.post('/login', async (req, res) => {
    const { phone: Phone, password } = req.body;
    try {
        const user = await User.findOne({ Phone });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        //generate token
        const token = jwt.sign({ id: user._id, name: user.Name }, Secret);
        await user.save();

        res.json({ token });


    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: 'Invalid credentials' });
    }

});

module.exports = Router;