const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    roomType: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType', required: true }
});

module.exports = mongoose.model('Room', roomSchema);
