const Student = require('../models/Student');

const addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('courses');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addStudent,
    getAllStudents
};
