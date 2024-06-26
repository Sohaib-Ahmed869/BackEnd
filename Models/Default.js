const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DefaultSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Default', DefaultSchema);