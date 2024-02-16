const express = require('express');
const router = express.Router();
const Category = require('../Models/Category');
const auth = require('../Middlewares/Auth/auth');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories: categories });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

router.post('/', async (req, res) => {
    const category = new Category({
        Name: req.body.Name,
        Status: req.body.Status
    });
    try {
        const savedCategory = await category.save();
        return res.status(200).json({ category: savedCategory });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);


router.put('/:id', async (req, res) => {
    try {
        const cat = await Category.findOne({ _id: req.params.id });
        cat.Name = req.body.Name;
        const updatedCategory = await cat.save();
        return res.status(200).json({ category: updatedCategory });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

router.put('/', async (req, res) => {
    try {
        const cat = await Category.findOne({
            Name: req.body.Name
        });
        cat.Status = cat.Status === 'Available' ? 'Unavailable' : 'Available';
        const updatedCategory = await cat.save();
        return res.status(200).json({ category: updatedCategory });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

router.put('/status/:id', async (req, res) => {
    try {
        const cat = await Category.findOne({ _id: req.params.id });
        cat.Status = req.body.Status;
        const updatedCategory = await cat.save();
        return res.status(200).json({ category: updatedCategory });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.deleteOne({ _id: req.params.id });
        return res.status(200).json({ category: deletedCategory });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);


module.exports = router;