const Course = require('../models/Course');
const RoomAvailability = require('../models/RoomAvailability');
const Room = require('../models/Room');
const RoomType = require('../models/RoomType');
const Student = require('../models/Student');

const initializeRoomAvailability = async (periodCode) => {
    const rooms = await Room.find().populate('roomType');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = 10;

    const availabilityEntries = [];

    for (const room of rooms) {
        if (room.roomType.typeName !== 'Lecture Hall') continue;

        for (const day of days) {
            for (let period = 1; period <= periods; period++) {
                availabilityEntries.push({
                    roomId: room._id,
                    periodCode,
                    dayOfWeek: day,
                    period,
                    isAvailable: true
                });
            }
        }
    }

    await RoomAvailability.insertMany(availabilityEntries);
    console.log(`Initialized room availability for the period ${periodCode}`);
};

const findAvailableRoom = async (totalStudents, dayOfWeek, period, periodCode) => {
    const availableRoom = await RoomAvailability.aggregate([
        {
            $lookup: {
                from: 'rooms',
                localField: 'roomId',
                foreignField: '_id',
                as: 'roomDetails'
            }
        },
        { $unwind: '$roomDetails' },
        {
            $lookup: {
                from: 'roomtypes',
                localField: 'roomDetails.roomType',
                foreignField: '_id',
                as: 'roomTypeDetails'
            }
        },
        { $unwind: '$roomTypeDetails' },
        {
            $match: {
                'roomDetails.capacity': { $gte: totalStudents },
                'roomTypeDetails.typeName': 'Lecture Hall',
                dayOfWeek,
                period,
                periodCode,
                isAvailable: true
            }
        }
    ]);

    return availableRoom.length > 0 ? availableRoom[0] : null;
};

const scheduleCourse = async (course, periodCode) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let meetingTimesScheduled = 0;
    let reasons = [];

    for (const day of days) {
        if (meetingTimesScheduled >= course.numMeetingTimes) break;
        let hoursScheduledToday = 0;

        for (let period = 1; period <= 10; period++) {
            if (hoursScheduledToday >= course.maxHoursPerDay || meetingTimesScheduled >= course.numMeetingTimes) break;

            const availableRoom = await findAvailableRoom(course.totalStudents, day, period, periodCode);

            if (availableRoom) {
                await RoomAvailability.updateOne(
                    { _id: availableRoom._id },
                    { $set: { isAvailable: false } }
                );

                await schedulesCollection.insertOne({
                    courseCode: course.courseCode,
                    roomName: availableRoom.roomDetails.roomName,
                    dayOfWeek: day,
                    period,
                    periodCode
                });

                meetingTimesScheduled++;
                hoursScheduledToday++;
            } else {
                reasons.push(`No available room for ${course.totalStudents} students on ${day}, period ${period}`);
            }
        }
    }

    return {
        scheduledSuccessfully: meetingTimesScheduled === course.numMeetingTimes,
        reasons: reasons.length > 0 ? reasons : ['Scheduled successfully']
    };
};

const scheduleAllCourses = async (req, res) => {
    try {
        const { periodCode } = req.params;

        // Initialize room availability if not already done
        await initializeRoomAvailability(periodCode);

        // Fetch courses
        const courses = await Course.find();

        // Query student counts for each course
        const courseStudentCounts = await Student.aggregate([
            { $unwind: '$courses' },
            { $group: { _id: '$courses', totalStudents: { $sum: 1 } } }
        ]);

        const scheduled = {};
        const nonScheduled = {};

        for (const course of courses) {
            // Find the total students for the current course
            const studentCount = courseStudentCounts.find(c => c._id.toString() === course._id.toString());
            course.totalStudents = studentCount ? studentCount.totalStudents : 0;

            const { scheduledSuccessfully, reasons } = await scheduleCourse(course, periodCode);
            if (scheduledSuccessfully) {
                scheduled[course.courseCode] = 'Scheduled';
            } else {
                nonScheduled[course.courseCode] = reasons.join('; ');
            }
        }

        res.status(200).json({ scheduled, nonScheduled });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    initializeRoomAvailability,
    scheduleAllCourses
};
