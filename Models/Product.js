const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    //name should be unique
    Name : { type : String, required : true },
    Description : { type : String, required : true },
    Price : { type : Number, required : true },
    Category : { type : String, required : true },
    Image : { type : String, required : true },
    Branches_Available : { type : Array, required : true }, //these are the branches where the product is available
    //make the variations a key value pair of variation name and price
    Variations : { type : Object, required : true },
});

module.exports = mongoose.model('Product', ProductSchema);