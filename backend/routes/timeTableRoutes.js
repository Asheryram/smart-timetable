const express = require('express');
const  {getAllSchedules,generateAllSchedules}= require('../controllers/timeTableController');
const router = express.Router();

router.get('/:code', getAllSchedules);
router.post('/:code', generateAllSchedules);


module.exports = router;
