const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName : { type: String, required: true},
    roomCapacity: { type: Number, required: true },
    roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType', required: true },
   
});

module.exports = mongoose.model('Room', roomSchema);
