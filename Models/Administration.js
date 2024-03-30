const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministationSchema = new Schema({
    Name : { type : String, required : true },
    Password : { type : String, required : true },
    Role : { type : String, required : true },
    Branch_Name : { type : String, required : false },
});

module.exports = mongoose.model('Admin', AdministationSchema);