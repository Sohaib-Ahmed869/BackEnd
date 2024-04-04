const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperAdminSchema = new Schema({
    Name: { type: String, required: true },
    Password: { type: String, required: true }
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);