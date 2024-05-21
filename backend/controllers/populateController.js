const Course = require('../models/Course');
const Room = require('../models/Room');
const RoomType = require('../models/RoomType');
const Student = require('../models/Student');
const Program = require('../models/Program');
const RoomAvailability = require('../models/RoomAvailability');

const populateData = async (req, res) => {
    try {
        // Sample data for RoomTypes
        const roomTypes = [
            { name: 'Lecture Hall', description: "A large hall for lectures" },
            { name: "Classroom", description: "A standard classroom" },
            { name: 'Office', description: "An office space" },
            { name: 'Lab', description: "A laboratory for practical experiments" },
            { name: 'Computer lab', description: "A laboratory for physical computations" },
        ];

        for (const roomType of roomTypes) {
            const exists = await RoomType.findOne({ name: roomType.name });
            if (!exists) {
                await RoomType.create(roomType);
            }
        }

        const roomTypeDocs = await RoomType.find({});

        // Sample data for Programs
        const programs = [
            { programName: 'Computer Science' },
            { programName: 'Statistics' },
            { programName: 'Mathematics' },
            { programName: 'Chemistry' },
            { programName: 'BioChemistry' },
        ];

        for (const program of programs) {
            const exists = await Program.findOne({ programName: program.programName });
            if (!exists) {
                await Program.create(program);
            }
        }

        const programDocs = await Program.find({});

        // Sample data for Rooms
        const rooms = [
            { roomName: 'GF1', capacity: 50, roomType: roomTypeDocs.find(rt => rt.name === 'Lecture Hall')._id },
            { roomName: 'GF2', capacity: 30, roomType: roomTypeDocs.find(rt => rt.name === 'Classroom')._id },
            { roomName: 'GF3', capacity: 50, roomType: roomTypeDocs.find(rt => rt.name === 'Classroom')._id },
            { roomName: 'FF1', capacity: 10, roomType: roomTypeDocs.find(rt => rt.name === 'Lecture Hall')._id },
            { roomName: 'FF2', capacity: 10, roomType: roomTypeDocs.find(rt => rt.name === 'Office')._id },
            { roomName: 'FF3', capacity: 10, roomType: roomTypeDocs.find(rt => rt.name === 'Lab')._id },
            { roomName: 'FF4', capacity: 10, roomType: roomTypeDocs.find(rt => rt.name === 'Computer lab')._id },
            { roomName: 'FF5', capacity: 1, roomType: roomTypeDocs.find(rt => rt.name === 'Classroom')._id },
        ];

        for (const room of rooms) {
            const exists = await Room.findOne({ roomName: room.roomName });
            if (!exists) {
                await Room.create(room);
            }
        }

        const roomDocs = await Room.find({});

        // Sample data for Courses
        const courses = [
            { courseCode: 'CS101', courseName: 'Introduction to Computer Science', programId: programDocs.find(p => p.programName === 'Computer Science')._id, maxHoursPerDay: 2, numMeetingTimes: 3, periodCode: '2024A' },
            { courseCode: 'STAT201', courseName: 'Statistics I', programId: programDocs.find(p => p.programName === 'Statistics')._id, maxHoursPerDay: 1, numMeetingTimes: 2, periodCode: '2024A' }
        ];

        for (const course of courses) {
            const exists = await Course.findOne({ courseCode: course.courseCode });
            if (!exists) {
                await Course.create(course);
            }
        }

        const courseDocs = await Course.find({});

        // Sample data for Students
        const students = [
            { studentId: 'S001', name: 'Alice', program: programDocs.find(p => p.programName === 'Computer Science')._id, yearGroup: 2024,course : "6648953320a535a519a37ccc" },
            { studentId: 'S002', name: 'Bob', program: programDocs.find(p => p.programName === 'Computer Science')._id, yearGroup: 2024,course : "6648953320a535a519a37ccc"  },
            { studentId: 'S003', name: 'Charlie', program: programDocs.find(p => p.programName === 'Statistics')._id, yearGroup: 2024,course : "6648953320a535a519a37ccc"  }
        ];

        for (const student of students) {
            const exists = await Student.findOne({ studentId: student.studentId });
            if (!exists) {
                await Student.create(student);
            }
        }

        // Initialize room availability for a specific period code
        const periodCode = '2024A';
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const periods = 10;

        const availabilityEntries = [];

        for (const room of roomDocs) {
            if (room.roomType.toString() === roomTypeDocs.find(rt => rt.name === 'Lecture Hall' || 'Classroom' || 'Computer lab')._id.toString()) {
                for (const day of days) {
                    for (let period = 1; period <= periods; period++) {
                        availabilityEntries.push({
                            roomId: room._id,
                            periodCode: periodCode,
                            dayOfWeek: day,
                            period: period,
                            isAvailable: true
                        });
                    }
                }
            }
        }

        for (const entry of availabilityEntries) {
            const exists = await RoomAvailability.findOne({ 
                roomId: entry.roomId, 
                periodCode: entry.periodCode, 
                dayOfWeek: entry.dayOfWeek, 
                period: entry.period 
            });
            if (!exists) {
                await RoomAvailability.create(entry);
            }
        }

        res.status(200).json({ message: 'Database populated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteAllData = async(req,res)=>{
    try{
        // Clear existing data
        await RoomType.deleteMany({});
        await Program.deleteMany({});
        await Room.deleteMany({});
        await Course.deleteMany({});
        await Student.deleteMany({});
        await RoomAvailability.deleteMany({});
        res.status(200).json({status:"success", message: 'Database cleared successfully' });

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    populateData,
    deleteAllData
};
