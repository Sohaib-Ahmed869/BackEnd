const ProductModel = require('../Models/Product');
const express = require('express');
const Product = ProductModel.Product;
const auth = require('./Auth');
const Router = express.Router();

Router.get('/', (req, res) => {
    Product.find()
    .then((products) => {
        res.json(products);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.get('/:idOrName', (req, res) => {
    Product.findOne({$or: [{_id: req.params.idOrName}, {Name: req.params.idOrName}]})
    .then((product) => {
        res.json(product);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.post ('/', auth, (req, res) => {
    const newProduct = new Product({
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        Category: req.body.Category,
        Image: req.body.Image,
        Branches_Available: req.body.Branches_Available,
        Variations: req.body.Variations,
    });
    newProduct.save()
    .then((product) => {
        res.json(product);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.put('/:id', auth, (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
    .then((product) => {
        res.json(product);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.delete('/:id', auth, (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then((product) => {
        res.json(product);
    })
    .catch((err) => {
        res.send(err);
    });
});

module.exports = Router;