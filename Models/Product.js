const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    //name should be unique
    name : { type : String, required : true },
    description : { type : String, required : true },
    price : { type : Number, required : true },
    category : { type : String, required : true },
    image : { type : String, required : true },
    branches_available : { type : Array, required : true }, //these are the branches where the product is available
    //make the variations a key value pair of variation name and price
    variations : { type : Object, required : true },
});

module.exports = mongoose.model('Product', ProductSchema);