const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    periodName: { type: String, required: true },
    periodRange: { type: String, required: true }
});

module.exports = mongoose.model('Period', periodSchema);
