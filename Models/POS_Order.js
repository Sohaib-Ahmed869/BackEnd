const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const POSOrderSchema = new Schema({
    Customer_Name : { type : String, required : false },
    Items : [{ type : Schema.Types.ObjectId, ref : 'Product' }],
    Total : { type : Number, required : true },
    GST : { type : Number, required : true },
    Grand_Total : { type : Number, required : true },
    Status : { type : String, required : true },
    Date : { type : Date, required : true },
    Payment_Method : { type : String, required : true },
    Payment_Done : { type : Boolean},
    Branch_Name : { type : String, required : false }, //this is because we have multiple branches
});

module.exports = mongoose.model('POSOrder', POSOrderSchema);