const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const courseRoutes = require('./routes/courseRoutes');
const roomTypeRoutes = require('./routes/roomTypeRoutes');
const schedulingRoutes = require('./routes/schedulingRoutes');
const populateRoutes = require('./routes/populateRoutes');

const app = express();
const port = 4000;

connectDB();

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/roomTypes', roomTypeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/scheduling', schedulingRoutes);
app.use('/api/data', populateRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
