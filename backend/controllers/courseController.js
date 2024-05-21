const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');

const getAllCourses = async (req, res) => {
    try {
        const data = await Course.find().populate('programId', 'programName').populate('yearGroupId', 'name');

        const filtered = await Promise.all(data.map(async (course) => {
            const totalStudents = await StudentCourse.countDocuments({ courseId: course._id });
            return {
                courseCode: course.courseCode,
                courseName: course.courseName,
                programName: course.programId.programName,
                yearGroup: course.yearGroupId.name,
                maxHoursPerDay: course.maxHoursPerDay,
                numMeetingTimes: course.numMeetingTimes,
                totalStudents,
                courseAssigned :false
            };
        }));

        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCourses
};
