
const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
    dayName: { type: String, required: true }
});

const Day = mongoose.model('Day', DaySchema)
module.exports =Day ;
