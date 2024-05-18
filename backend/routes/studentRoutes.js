const express = require('express');
const { addStudent, getAllStudents } = require('../controllers/studentController');

const router = express.Router();

router.post('/', addStudent);
router.get('/', getAllStudents);

module.exports = router;
