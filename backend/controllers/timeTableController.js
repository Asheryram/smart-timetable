const TimeTable = require('../models/TimeTable');

const getAllSchedules = async (req, res) => {
    try {
        const students = await TimeTable.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getAllSchedules,
};
