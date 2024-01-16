const ProductModel = require('../Models/Product');
const express = require('express');
const Product = ProductModel.Product;
const auth = require('./Auth');
const Router = express.Router();


module.exports = Router;