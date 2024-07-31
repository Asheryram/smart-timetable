const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    courseInstanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseInstance', required: true }
}, {
    unique: ['studentId', 'courseInstanceId'] // Ensure unique pair of studentId and courseInstanceId=
});

module.exports = mongoose.model('StudentCourse', studentCourseSchema);
