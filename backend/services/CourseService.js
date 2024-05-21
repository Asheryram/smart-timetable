const mongoose = require('mongoose');
const Course = require('../models/Course'); 

const readAllCourses = async () => await Course.find();
const getCourseById = async (courseId) => await Course.findById(courseId);
const getCoursesByProgramId = async (programId) => await Course.find({ programId });
const getCoursesByYearGroupId = async (yearGroupId) => await Course.find({ yearGroupId });
const getCoursesByAssignedStatus = async (assigned) => await Course.find({ assigned });


const getCoursesWithProgramDetails = async (programId) => {
    return await Course.find( programId ).populate({
        path: 'programId',
        select: 'programName' 
    });
};


module.exports = {
    readAllCourses,
    getCourseById,
    getCoursesByProgramId,
    getCoursesByYearGroupId,
    getCoursesByAssignedStatus,
    getCoursesWithProgramDetails,
};


