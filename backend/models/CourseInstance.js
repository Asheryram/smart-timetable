const mongoose = require('mongoose');

const courseInstanceSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    yearGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'YearGroup', required: true },
    maxHoursPerDay: { type: Number, required: true },
    numMeetingTimes: { type: Number, required: true }
});

module.exports = mongoose.model('CourseInstance', courseInstanceSchema);
