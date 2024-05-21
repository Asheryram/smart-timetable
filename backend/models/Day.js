const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    dayName: { type: String, required: true }
});

module.exports = mongoose.model('Day', daySchema);
