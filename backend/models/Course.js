const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    meetingTimesPerDay: { type: Number, required: true },
    meetingTimesPerWeek: { type: Number, required: true },
    yearGroup: { type: String, required: true },
    assigned: { type: Boolean, required: true }
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
