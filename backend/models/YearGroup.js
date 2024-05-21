const mongoose = require('mongoose');

const yearGroupSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('YearGroup', yearGroupSchema);
