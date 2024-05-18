const mongoose = require('mongoose');

const roomAvailabilitySchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    periodCode: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    period: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true }
});

module.exports = mongoose.model('RoomAvailability', roomAvailabilitySchema);
