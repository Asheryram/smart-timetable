const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    indexNo: {type: String, required: true},
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    yearGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'YearGroup', required: true }});

module.exports = mongoose.model('Student', studentSchema);
