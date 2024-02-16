const ProductModel = require('../Models/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.find();
            return res.status(200).json({ products: products });
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await ProductModel.findOne({ _id: req.params.id });
            return res.status(200).json({ product: product });
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    },
};

module.exports = productController;