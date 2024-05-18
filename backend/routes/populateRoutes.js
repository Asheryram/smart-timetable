const express = require('express');
const { populateData,deleteAllData } = require('../controllers/populateController');

const router = express.Router();

router.post('/populate', populateData);
router.delete('/delete-all', deleteAllData);

module.exports = router;
