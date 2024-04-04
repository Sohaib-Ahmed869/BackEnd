const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashierSchema = new Schema({
    Name: { type: String, required: true },
    Password: { type: String, required: true },
    Phone: { type: String, required: true }, 
    Status: { type: String, required: true }
});


module.exports = mongoose.model('Cashier', CashierSchema);