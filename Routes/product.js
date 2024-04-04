const express = require('express');
const Product = require('../Models/Product');
const Router = express.Router();

Router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({ products: products });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

module.exports = Router;