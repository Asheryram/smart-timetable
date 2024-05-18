const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    maxHoursPerDay: { type: Number, required: true },
    numMeetingTimes: { type: Number, required: true },
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
