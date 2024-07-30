const Course = require('../models/Course');
const CourseInstance = require('../models/CourseInstance');
const StudentCourse = require('../models/StudentCourse');

const getFilteredCourses = async () => {
    // Fetch all course instances and populate necessary fields
    const data = await CourseInstance.find()
        .populate('courseId', 'courseName courseCode')
        .populate('programId', 'programName')
        .populate('yearGroupId', 'name');

    // Map over each course instance to format the response and count total students
    const filtered = await Promise.all(data.map(async (courseInstance) => {
        const totalStudents = await StudentCourse.countDocuments({ courseInstanceId: courseInstance._id });
        return {
            courseCode: courseInstance.courseId.courseCode,
            name: courseInstance.courseId.courseName,
            program: courseInstance.programId.programName,
            yearGroup: courseInstance.yearGroupId.name,
            meetingTimesPerDay: courseInstance.maxHoursPerDay,
            meetingTimesPerWeek: courseInstance.numMeetingTimes,
            totalStudents,
            // assigned: false 
        };
    }));
    return filtered;
}

const getAllCourses = async (req, res) => {
    try {
        const filtered = await getFilteredCourses();
        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCourses,
    getFilteredCourses
};
