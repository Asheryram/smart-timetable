const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, {
    unique: ['studentId', 'courseId'] // Ensure unique pair of studentId and courseId
});

module.exports = mongoose.model('StudentCourse', studentCourseSchema);
