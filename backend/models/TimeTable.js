const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    roomName: { type: String, required: true },
    day: { type: String, required: true },
    period: { type: String, required: true },
    yearGroup: { type: String, required: true },
    program: { type: String, required: true },
    scheduled: { type: Boolean, required: true },
    code: { type: String, required: true }
});

module.exports = mongoose.model('TimeTable', timeTableSchema);
