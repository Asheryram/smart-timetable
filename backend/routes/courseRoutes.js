const express = require('express');
const { scheduleAllCourses,getCoursesWithStudentCounts ,getAllCourses } = require('../controllers/courseController');

const router = express.Router();

router.post('/schedule/:periodCode', scheduleAllCourses);
router.get('/courses-with-students', getCoursesWithStudentCounts);
router.get('/', getAllCourses);

module.exports = router;
