const express = require('express');
const Product = require('../Models/Product');
const auth = require('./Auth');
const Router = express.Router();

Router.get('/',async (req, res) => {
    const products=await Product.find({});
    //console.log(products);
    res.json(products);
});


module.exports = Router;