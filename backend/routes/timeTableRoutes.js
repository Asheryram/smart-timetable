const express = require('express');
const  {getAllSchedules}= require('../controllers/timeTableController');
const router = express.Router();

router.get('/:code', getAllSchedules);


module.exports = router;
