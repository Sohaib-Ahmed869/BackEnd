const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    Name : { type : String, required : true },
    Email : { type : String, required : false },
});

module.exports = mongoose.model('Branch', BranchSchema);