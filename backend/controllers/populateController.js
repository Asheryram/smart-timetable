const RoomAvailability = require('../models/RoomAvailability');
const Course = require('../models/Course');
const Day = require('../models/Day');
const Period = require('../models/Period');
const Program = require('../models/Program');
const Room = require('../models/Room');
const RoomType = require('../models/RoomType');
const YearGroup = require('../models/YearGroup');
const Student = require('../models/Student');
const StudentCourse = require('../models/StudentCourse');

const populateDatabase = async (req, res) => {
    try {
        console.log("Deletion ...")

        // Clear existing data
        await Promise.all([
            RoomAvailability.deleteMany({}),
            Course.deleteMany({}),
            Day.deleteMany({}),
            Period.deleteMany({}),
            Program.deleteMany({}),
            Room.deleteMany({}),
            RoomType.deleteMany({}),
            YearGroup.deleteMany({}),
            Student.deleteMany({}),
            StudentCourse.deleteMany({})
        ]);
    console.log("Populate roomtype ....")


        // Populate RoomType
        const roomTypes = [
            { roomTypeName: 'Hall', description: 'Large lecture hall' },
            { roomTypeName: 'Laboratory', description: 'Science lab' },
            { roomTypeName: 'Computer Lab', description: 'Computational Sciences lab' },
            { roomTypeName: 'Class', description: 'Classroom' }
        ];

        const savedRoomTypes = await RoomType.insertMany(roomTypes);
        console.log("Populate room ...")

        // Populate Room
        const rooms = [
            { roomName: "FF1" ,roomCapacity: 70, roomTypeId: savedRoomTypes[0]._id}, 
            { roomName : "FF2" ,roomCapacity: 90, roomTypeId: savedRoomTypes[0]._id}, 
            { roomName: "FF3", roomCapacity: 60, roomTypeId: savedRoomTypes[1]._id}, 
            { roomName: "FF4", roomCapacity: 80, roomTypeId: savedRoomTypes[2]._id}, 
            { roomName: "FF5", roomCapacity: 100, roomTypeId: savedRoomTypes[3]._id}
        ];
        const savedRooms = await Room.insertMany(rooms);
        console.log("Populate days...")

        // Populate Day
        const days = [
            { dayName: 'Monday' },
            { dayName: 'Tuesday' },
            { dayName: 'Wednesday' },
            { dayName: 'Thursday' },
            { dayName: 'Friday' },
        ];
        const savedDays = await Day.insertMany(days);
        console.log("Populate Periods ...")

        // Populate Period
        const periods = [
            { periodName: 'Period 1', periodRange: '08:00-09:00' },
            { periodName: 'Period 2', periodRange: '09:00-10:00' },
            { periodName: 'Period 3', periodRange: '10:00-11:00' },
            { periodName: 'Period 4', periodRange: '11:00-12:00' },
            { periodName: 'Period 5', periodRange: '12:00-13:00' },
            { periodName: 'Period 6', periodRange: '13:00-14:00' },
            { periodName: 'Period 7', periodRange: '14:00-15:00' },
            { periodName: 'Period 8', periodRange: '15:00-16:00' },
            { periodName: 'Period 9', periodRange: '16:00-17:00' },
            { periodName: 'Period 10', periodRange: '17:00-18:00' },
        ];
        const savedPeriods = await Period.insertMany(periods);
        console.log("Populate programs ...")

        // Populate Program
        const programs = [
            { programName: 'Computer Science' },
            { programName: 'Physics' },
            { programName: 'Biology' },
            { programName: 'Chemistry' },
            { programName: 'Mathematics' },
            { programName: 'Economics' },
            { programName: 'Statistics' },
        ];
        const savedPrograms = await Program.insertMany(programs);
        console.log("Populate year group ...")

        // Populate YearGroup
        const yearGroups = [
            { name: 'Year 1' },
            { name: 'Year 2' },
            { name: 'Year 3' },
        ];
        const savedYearGroups = await YearGroup.insertMany(yearGroups);
        console.log("Populate course ...")

        // Populate Course
        const courses = [
            { courseCode: 'CSM111', courseName: 'Intro To Computers', programId: savedPrograms[0]._id, maxHoursPerDay: 2, numMeetingTimes: 2, yearGroupId: savedYearGroups[0]._id },
            { courseCode: 'PHY121', courseName: 'Intro To Hardware', programId: savedPrograms[1]._id, maxHoursPerDay: 1, numMeetingTimes: 1, yearGroupId: savedYearGroups[1]._id },
            { courseCode: 'AFC111', courseName: 'Intro To Accounting', programId: savedPrograms[2]._id, maxHoursPerDay: 1, numMeetingTimes: 1, yearGroupId: savedYearGroups[2]._id },
            { courseCode: 'BIO101', courseName: 'Biology Basics', programId: savedPrograms[3]._id, maxHoursPerDay: 1, numMeetingTimes: 1, yearGroupId: savedYearGroups[0]._id },
            { courseCode: 'CHE101', courseName: 'Chemistry Basics', programId: savedPrograms[4]._id, maxHoursPerDay: 1, numMeetingTimes: 2, yearGroupId: savedYearGroups[0]._id },
            { courseCode: 'MTH101', courseName: 'Mathematics I', programId: savedPrograms[5]._id, maxHoursPerDay: 2, numMeetingTimes: 3, yearGroupId: savedYearGroups[0]._id },
            { courseCode: 'ENG101', courseName: 'English Composition', programId: savedPrograms[6]._id, maxHoursPerDay: 1, numMeetingTimes: 2, yearGroupId: savedYearGroups[1]._id },
            { courseCode: 'PHY201', courseName: 'Advanced Physics', programId: savedPrograms[1]._id, maxHoursPerDay: 1, numMeetingTimes: 2, yearGroupId: savedYearGroups[2]._id },
            { courseCode: 'CSC201', courseName: 'Data Structures', programId: savedPrograms[0]._id, maxHoursPerDay: 2, numMeetingTimes: 3, yearGroupId: savedYearGroups[1]._id },
            { courseCode: 'ECO101', courseName: 'Introduction to Economics', programId: savedPrograms[6]._id, maxHoursPerDay: 1, numMeetingTimes: 2, yearGroupId: savedYearGroups[0]._id },
            { courseCode: 'STA101', courseName: 'Statistics I', programId: savedPrograms[6]._id, maxHoursPerDay: 2, numMeetingTimes: 1, yearGroupId: savedYearGroups[1]._id },
            { courseCode: 'PSY101', courseName: 'Introduction to Psychology', programId: savedPrograms[6]._id, maxHoursPerDay: 1, numMeetingTimes: 2, yearGroupId: savedYearGroups[1]._id },
        ];
        const savedCourses = await Course.insertMany(courses);
        console.log("Populate roomAvailability ...")

        // Populate RoomAvailability
        const roomAvailabilityData = [
            // Data for FF1 on Monday
            { roomId: savedRooms[0]._id, isAvailable: true, periodId: savedPeriods[0]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[0]._id, isAvailable: true, periodId: savedPeriods[1]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[0]._id, isAvailable: true, periodId: savedPeriods[2]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[0]._id, isAvailable: true, periodId: savedPeriods[3]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[0]._id, isAvailable: true, periodId: savedPeriods[4]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[0]._id, isAvailable: true, periodId: savedPeriods[5]._id, dayId: savedDays[0]._id },
            // Data for FF2 on Monday
            { roomId: savedRooms[1]._id, isAvailable: true, periodId: savedPeriods[0]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[1]._id, isAvailable: true, periodId: savedPeriods[1]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[1]._id, isAvailable: true, periodId: savedPeriods[2]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[1]._id, isAvailable: true, periodId: savedPeriods[3]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[1]._id, isAvailable: true, periodId: savedPeriods[4]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[1]._id, isAvailable: true, periodId: savedPeriods[5]._id, dayId: savedDays[0]._id },
            // Data for FF3 on Monday
            { roomId: savedRooms[2]._id, isAvailable: true, periodId: savedPeriods[0]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[2]._id, isAvailable: true, periodId: savedPeriods[1]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[2]._id, isAvailable: true, periodId: savedPeriods[2]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[2]._id, isAvailable: true, periodId: savedPeriods[3]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[2]._id, isAvailable: true, periodId: savedPeriods[4]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[2]._id, isAvailable: true, periodId: savedPeriods[5]._id, dayId: savedDays[0]._id },
            // Data for GG1 on Monday
            { roomId: savedRooms[3]._id, isAvailable: true, periodId: savedPeriods[0]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[3]._id, isAvailable: true, periodId: savedPeriods[1]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[3]._id, isAvailable: true, periodId: savedPeriods[2]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[3]._id, isAvailable: true, periodId: savedPeriods[3]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[3]._id, isAvailable: true, periodId: savedPeriods[4]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[3]._id, isAvailable: true, periodId: savedPeriods[5]._id, dayId: savedDays[0]._id },
            // Data for GG2 on Monday
            { roomId: savedRooms[4]._id, isAvailable: true, periodId: savedPeriods[0]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[4]._id, isAvailable: true, periodId: savedPeriods[1]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[4]._id, isAvailable: true, periodId: savedPeriods[2]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[4]._id, isAvailable: true, periodId: savedPeriods[3]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[4]._id, isAvailable: true, periodId: savedPeriods[4]._id, dayId: savedDays[0]._id },
            { roomId: savedRooms[4]._id, isAvailable: true, periodId: savedPeriods[5]._id, dayId: savedDays[0]._id },
        ];
        await RoomAvailability.insertMany(roomAvailabilityData);
        console.log("Populate students ...")

        // Populate Student
        const students = [
            { email: 'john.doe@example.com', name: 'John Doe' },
            { email: 'jane.smith@example.com', name: 'Jane Smith' },
            { email: 'alice.johnson@example.com', name: 'Alice Johnson' },
        ];
        const savedStudents = await Student.insertMany(students);
        console.log("Populate StudentCourse ...")

        // Populate StudentCourse
        const studentCourses = [
            { studentId: savedStudents[0]._id, courseId: savedCourses[0]._id },
            { studentId: savedStudents[0]._id, courseId: savedCourses[1]._id },
            { studentId: savedStudents[1]._id, courseId: savedCourses[0]._id },
            { studentId: savedStudents[1]._id, courseId: savedCourses[2]._id },
            { studentId: savedStudents[2]._id, courseId: savedCourses[0]._id },
            { studentId: savedStudents[2]._id, courseId: savedCourses[1]._id },
        ];
        await StudentCourse.insertMany(studentCourses);

        res.status(200).json({ message: 'Database populated successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    populateDatabase
};
