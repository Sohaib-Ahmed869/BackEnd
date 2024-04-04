const Router = require('express').Router();
const Tax = require('../Models/Default');

//get all taxes
Router.get('/', async (req, res) => {
    try {
        const taxes = await Tax.find();
        return res.json(taxes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

//post a tax
Router.post('/', async (req, res) => {
    try {
        const tax = new Tax({
            name: req.body.name,
            value: req.body.value
        });
        await tax.save();
        return res.json(tax);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

//delete a tax //dor dev purpose only
Router.delete('/:id', async (req, res) => {
    try {
        await Tax.findByIdAndDelete(req.params.id);
        return res.json({ msg: 'Tax deleted' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

//update a tax //used in the app
Router.put('/:id', async (req, res) => {
    try {
        const tax = await Tax.findById(req.params.id);
        tax.value = req.body.value;
        await tax.save();
        return res.json(tax);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = Router;