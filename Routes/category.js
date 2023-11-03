const express = require('express');
const router = express.Router();
const Category = require('./models/category');
const auth = require('./Auth');

router.get('/', (req, res) => {
    Category.find({})
    .then(categories => {
        res.json(categories);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

router.post('/', auth, (req, res) => {
    const newCategory = new Category(req.body);
    newCategory.save()
    .then(category => {
        res.json(category);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', auth, (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        res.json(category);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

module.exports = router;