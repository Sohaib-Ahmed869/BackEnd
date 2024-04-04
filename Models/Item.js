const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    //name should be unique
    Name : { type : String, required : true },
    Price : { type : Number, required : true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Item', ItemSchema);