const express = require('express');
const { createRoomType, getAllRoomTypes } = require('../controllers/roomTypeController');

const router = express.Router();

router.post('/', createRoomType);
router.get('/', getAllRoomTypes);

module.exports = router;
