const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//import the product schema
const Product = require('./Product');


const OrderSchema = new Schema({
    Order_Id : { type : String, required : true },
    Customer_Name : { type : String, required : true },
    Customer_Address : { type : String, required : true },
    Customer_Phone : { type : String, required : true },
    Items : { type : [Product], required : true },
    Total : { type : Number, required : true },
    GST : { type : Number, required : true },
    Status : { type : String, required : true },
    Date : { type : Date, required : true },
    Time : { type : String, required : true },
    Payment_Method : { type : String, required : true },
    Ordered_From : { type : String, required : true }, //this can be website or app 
    Branch_Name : { type : String, required : true }, //this is because we have multiple branches
});

module.exports = mongoose.model('Order', OrderSchema);