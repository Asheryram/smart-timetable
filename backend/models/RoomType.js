const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
    roomTypeName: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('RoomType', roomTypeSchema);
