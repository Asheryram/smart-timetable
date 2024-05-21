const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    maxHoursPerDay: { type: Number, required: true },
    numMeetingTimes: { type: Number, required: true },
    yearGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'YearGroup', required: true }
});

module.exports = mongoose.model('Course', courseSchema);
