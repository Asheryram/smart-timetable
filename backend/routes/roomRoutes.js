const express = require('express');
const { createRoom, getAllRooms } = require('../controllers/roomController');

const router = express.Router();

router.post('/', createRoom);
router.get('/', getAllRooms);

module.exports = router;
