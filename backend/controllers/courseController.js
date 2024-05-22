const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');


const getFilteredCourses = async()=>{
    const data = await Course.find().populate('programId', 'programName').populate('yearGroupId', 'name');

    const filtered = await Promise.all(data.map(async (course) => {
        const totalStudents = await StudentCourse.countDocuments({ courseId: course._id });
        return {
            courseCode: course.courseCode,
            name: course.courseName,
            program: course.programId.programName,
            yearGroup: course.yearGroupId.name,
            meetingTimesPerDay: course.maxHoursPerDay,
            meetingTimesPerWeek: course.numMeetingTimes,
            totalStudents,
            assigned :false
        };
    }));
    return filtered;
}
const getAllCourses = async (req, res) => {
    try {
        const filtered = await getFilteredCourses()
        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCourses,
    getFilteredCourses
};
