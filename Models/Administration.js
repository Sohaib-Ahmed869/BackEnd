const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministationSchema = new Schema({
    name : { type : String, required : true },
    phone : { type : String, required : true },
    email : { type : String, required : true },
    password : { type : String, required : true },
    isManager : { type : Boolean, required : true },
    branch_name : { type : String, required : false }, //this is used when the person is a manager not an admin
    token : { type : String, required : false },
});

module.exports = mongoose.model('Admin', AdministationSchema);