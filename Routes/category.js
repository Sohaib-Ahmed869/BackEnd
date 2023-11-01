const express = require('express');
const router = express.Router();
const Category = require('./models/category'); // Assuming you have a Category model defined

// GET endpoint
router.get('/', (req, res) => {
    Category.find({})
    .then(categories => {
        res.json(categories);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

// POST endpoint
router.post('/', (req, res) => {
    const newCategory = new Category(req.body);
    newCategory.save()
    .then(category => {
        res.json(category);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

// DELETE endpoint
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        res.json(category);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

// UPDATE endpoint
router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(category => {
        res.json(category);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

module.exports = router;