const ProductModel = require('../Models/Product');
const express = require('express');

const Router = express.Router();
const productController = require('../Controllers/productController');

Router.get('/', productController.getAllProducts);
Router.get('/:id', productController.getProductById);

module.exports = Router;