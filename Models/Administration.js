const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministationSchema = new Schema({
    Name : { type : String, required : true },
    Phone : { type : String, required : true },
    Email : { type : String, required : true },
    Password : { type : String, required : true },
    Role : { type : String, required : true },
    Branch_Name : { type : String, required : false }, //this is used when the person is a manager not an admin
});

module.exports = mongoose.model('Admin', AdministationSchema);