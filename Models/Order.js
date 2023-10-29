const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    Order_id : { type : String, required : true },
    Customer_Name : { type : String, required : true },
    Customer_Address : { type : String, required : true },
    Customer_Phone : { type : String, required : true },
    Items : { type : Array, required : true },
    Total : { type : Number, required : true },
    GST : { type : Number, required : true },
    Status : { type : String, required : true },
    date : { type : Date, required : true },
    Time : { type : String, required : true },
    Payment_Method : { type : String, required : true },
    Ordered_from : { type : String, required : true }, //this can be website or app 
    branch_name : { type : String, required : true }, //this is because we have multiple branches
});

module.exports = mongoose.model('Order', OrderSchema);