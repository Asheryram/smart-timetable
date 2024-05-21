const express = require('express');
const { getAllRoomAvailability} = require('../controllers/roomAvailabilityController');
const router = express.Router();

router.get('/', getAllRoomAvailability);

module.exports = router;
