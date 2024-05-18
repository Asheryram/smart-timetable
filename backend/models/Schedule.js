const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    roomName: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    period: { type: Number, required: true },
    periodCode: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
