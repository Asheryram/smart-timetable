const mongoose = require('mongoose');

const roomAvailabilitySchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    periodCode: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
    periodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true },
    isAvailable: { type: Boolean, required: true },
    classAssigned: { type: String, required: true }
});
const RoomAvailability = mongoose.model('RoomAvailability', roomAvailabilitySchema)
module.exports = RoomAvailability;
