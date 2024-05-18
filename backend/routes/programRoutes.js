const express = require('express');
const { createProgram, getAllPrograms } = require('../controllers/programController');

const router = express.Router();

router.post('/', createProgram);
router.get('/', getAllPrograms);

module.exports = router;
