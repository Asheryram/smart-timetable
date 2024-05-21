const express = require('express');
const { getAllStudents, addStudent } = require('../controllers/studentController');
const router = express.Router();

router.get('/students', getAllStudents);
router.post('/students', addStudent);

module.exports = router;
