const express = require('express');
const { scheduleAllCourses,getCoursesWithStudentCounts } = require('../controllers/courseController');

const router = express.Router();

router.post('/schedule/:periodCode', scheduleAllCourses);
router.get('/courses-with-students', getCoursesWithStudentCounts);

module.exports = router;
