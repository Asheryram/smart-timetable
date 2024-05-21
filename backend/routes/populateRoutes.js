const express = require('express');
const { populateDatabase } = require('../controllers/populateController');
const router = express.Router();

router.post('/', populateDatabase);

module.exports = router;
