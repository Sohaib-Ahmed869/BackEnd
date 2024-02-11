const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    Name: { type: String, required: true },
    Phone : { type : String, required : true },
    Addresses : { type : Array, required : true },
    Email : { type : String, required : true },
    Favourite_Products : { type : Array, required : false },
    Status : { type : String, required : true },
});

module.exports = mongoose.model('Customer', CustomerSchema);