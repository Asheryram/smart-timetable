const mongoose = require('mongoose');

const roomAvailabilitySchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    isAvailable: { type: Boolean, required: true },
    periodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true },
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true }
});

module.exports = mongoose.model('RoomAvailability', roomAvailabilitySchema);
