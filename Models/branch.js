const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    Name : { type : String, required : true },
    Email : { type : String, required : false },
    Address : { type : String, required : true },
    Phone : { type : String, required : true },
    Managers_ids : { type : Array}
});

module.exports = mongoose.model('Branch', BranchSchema);