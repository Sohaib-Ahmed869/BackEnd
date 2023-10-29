const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    phone : { type : String, required : true },
    addresses : { type : Array, required : true },
    email : { type : String, required : true },
    favourite_products : { type : Array, required : true },
    token : { type : String, required : false },
});

module.exports = mongoose.model('Customer', CustomerSchema);