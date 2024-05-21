const mongoose = require('mongoose');

const PeriodSchema = new mongoose.Schema({
    periodNumber: { type: Number, required: true }
});
const Period = mongoose.model('Period', PeriodSchema)
module.exports = Period;
