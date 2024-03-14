const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    //name should be unique
    Name : { type : String, required : true },
    Description : { type : String, required : true },
    Price : { type : Number, required : true },
    Category : { type : String, required : true },
    Image : { type : String, required : false },
    Variations : { type : Object},
    Status: { type : String, required : true },
    Discount: { type: Number }
});

module.exports = mongoose.model('Product', ProductSchema);