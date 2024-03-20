const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//import the product schema
const Product = require('./Product');

const OrderItemSchema = new Schema({
    Product : { type : Schema.Types.ObjectId, ref : 'Product' },
    Quantity : { type : Number, required : true },
    Price : { type : Number, required : true },
});

const OrderSchema = new Schema({
    Customer_Name : { type : String, required : true },
    Customer_Address : { type : String, required : true },
    Customer_Phone : { type : String, required : true },
    Items : [OrderItemSchema],
    Total : { type : Number, required : true },
    GST : { type : Number, required : true },
    Grand_Total : { type : Number, required : true },
    Status : { type : String, required : true, default: 'Pending' },
    Date : { type : Date, required : true , default: Date.now()},
    Payment_Method : { type : String, required : true, default: 'Cash' },
    Ordered_From : { type : String, required : true },
    Branch_Name : { type : String, required : true }, //this is because we have multiple branches
    Delivery_Charges: { type : Number, required : true, default: 0 },
    Comment: { type : String, required : false },
});

module.exports = mongoose.model('Order', OrderSchema);