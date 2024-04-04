const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    //name should be unique
    Name : { type : String, required : true },
    Price : { type : Number, required : true },
    quantity: { type: Number, required: true }
});

const POSOrderSchema = new Schema({
    Customer_Name : { type : String, required : false },
    Items : { type : Array, required : true },
    Refunded_Items : [ItemSchema],
    Total : { type : Number, required : true },
    GST : { type : Number, required : true },
    Grand_Total : { type : Number, required : true },
    Status : { type : String, required : true },
    Date : { type : Date, required : true },
    Payment_Method : { type : String, required : true },
    Payment_Done : { type : Boolean},
    Branch_Name : { type : String, required : false }, //this is because we have multiple branches
});

module.exports = mongoose.model('POS_Order', POSOrderSchema);
