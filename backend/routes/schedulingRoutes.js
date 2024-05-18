const express = require('express');
const { scheduleAllCourses } = require('../controllers/schedulingController');

const router = express.Router();

router.post('/schedule/:periodCode', scheduleAllCourses);

module.exports = router;
