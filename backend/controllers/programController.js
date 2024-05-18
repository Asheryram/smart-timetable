const Program = require('../models/Program');

const createProgram = async (req, res) => {
    try {
        const program = new Program(req.body);
        await program.save();
        res.status(201).json(program);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createProgram,
    getAllPrograms
};
