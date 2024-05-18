const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    programName: { type: String, required: true, unique: true }
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
