const mongoose = require('mongoose');
// MongoDB Connection URI
// const uri = 'mongodb+srv://ashertettehabotsi:3m1NqZbDZ2m81AYQ@cluster0.bizxif1.mongodb.net/SMART_TIME_TABLE_V1?retryWrites=true&w=majority&appName=Cluster01';

const uri = 'mongodb://0.0.0.0:27017/SMART_TIME_TABLE_V';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:' ,err.message);
        process.exit(1);
    }
};

module.exports = connectDB;