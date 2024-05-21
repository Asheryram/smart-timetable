const Student = require('../models/Student');

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addStudent = async (req, res) => {
    try {
        const { email, name, yearGroupId } = req.body;
        const student = new Student({ email, name, yearGroupId });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllStudents,
    addStudent
};
