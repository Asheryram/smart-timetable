const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const timeTableRoutes = require('./routes/timeTableRoutes');
const populateRoutes = require('./routes/populateRoutes');
const roomRoutes = require('./routes/roomRoutes');
const roomAvailabilityRoutes = require('./routes/roomAvailabilityRoutes');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 5000;

connectDB();

app.use('/api/courses', courseRoutes);
app.use('/api/roomAvailability', roomAvailabilityRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/populate', populateRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/schedule', timeTableRoutes);


// Start the server on port 4000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
