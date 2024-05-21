const Course = require("../models/Course");
const RoomAvailability = require("../models/RoomAvailability");
const Student = require("../models/Student");
const Room = require("../models/Room");
const { readAllCourses } = require("../services/CourseService");

const initializeRoomAvailability = async (periodCode) => {
	const rooms = await Room.find({}).populate("roomType");
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const periods = 10;

	const availabilityEntries = [];

	for (const room of rooms) {
		if (room.roomType.typeName !== "Lecture Hall") continue;

		for (const day of days) {
			for (let period = 1; period <= periods; period++) {
				availabilityEntries.push({
					roomId: room._id,
					periodCode: periodCode,
					dayOfWeek: day,
					period: period,
					isAvailable: true,
				});
			}
		}
	}

	await RoomAvailability.insertMany(availabilityEntries);
	console.log(`Initialized room availability for the period ${periodCode}`);
};

const findAvailableRoom = async (
	totalStudents,
	dayOfWeek,
	period,
	periodCode
) => {
	const availableRoom = await RoomAvailability.aggregate([
		{
			$lookup: {
				from: "rooms",
				localField: "roomId",
				foreignField: "_id",
				as: "roomDetails",
			},
		},
		{ $unwind: "$roomDetails" },
		{
			$lookup: {
				from: "roomtypes",
				localField: "roomDetails.roomType",
				foreignField: "_id",
				as: "roomTypeDetails",
			},
		},
		{ $unwind: "$roomTypeDetails" },
		{
			$match: {
				"roomDetails.capacity": { $gte: totalStudents },
				"roomTypeDetails.typeName": "Lecture Hall",
				dayOfWeek: dayOfWeek,
				period: period,
				periodCode: periodCode,
				isAvailable: true,
			},
		},
	]).toArray();

	return availableRoom.length > 0 ? availableRoom[0] : null;
};

const scheduleCourse = async (course, periodCode) => {
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	let meetingTimesScheduled = 0;

	for (const day of days) {
		if (meetingTimesScheduled >= course.numMeetingTimes) break;
		let hoursScheduledToday = 0;

		for (let period = 1; period <= 10; period++) {
			if (
				hoursScheduledToday >= course.maxHoursPerDay ||
				meetingTimesScheduled >= course.numMeetingTimes
			)
				break;

			const availableRoom = await findAvailableRoom(
				course.totalStudents,
				day,
				period,
				periodCode
			);

			if (availableRoom) {
				await RoomAvailability.updateOne(
					{ _id: availableRoom._id },
					{ $set: { isAvailable: false } }
				);

				await schedulesCollection.insertOne({
					courseCode: course.courseCode,
					roomName: availableRoom.roomDetails.roomName,
					dayOfWeek: day,
					period: period,
					periodCode: periodCode,
				});

				meetingTimesScheduled++;
				hoursScheduledToday++;
			}
		}
	}

	return meetingTimesScheduled === course.numMeetingTimes;
};

const scheduleAllCourses = async (req, res) => {
	try {
		const { periodCode } = req.body;
		const courses = await Course.find({ periodCode: periodCode });

		// Query student counts for each course
		const courseStudentCounts = await Student.aggregate([
			{ $unwind: "$courses" },
			{ $group: { _id: "$courses", totalStudents: { $sum: 1 } } },
		]);

		const scheduled = {};

		for (const course of courses) {
			// Find the total students for the current course
			const studentCount = courseStudentCounts.find(
				(c) => c._id.toString() === course._id.toString()
			);
			course.totalStudents = studentCount ? studentCount.totalStudents : 0;

			const scheduledSuccessfully = await scheduleCourse(course, periodCode);
			scheduled[course.courseCode] = scheduledSuccessfully
				? "Scheduled"
				: "Not Scheduled";
		}

		res.status(200).json(scheduled);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getCoursesWithStudentCounts = async (req, res) => {
	try {
		const courses = await Course.aggregate([
			{
				$lookup: {
					from: "students",
					localField: "_id",
					foreignField: "courses",
					as: "students",
				},
			},
			{
				$addFields: {
					totalStudents: { $size: "$students" },
				},
			},
			{
				$project: {
					students: 0,
				},
			},
		]);

		res.status(200).json(courses);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("programId", "programName");

        // Get student counts for each course
        const courseStudentCounts = await Promise.all(
            courses.map(async course => {
                const studentCount = await Student.countDocuments({ courses: course._id });
                return { course, studentCount };
            })
        );

        const filtered = courseStudentCounts.map(({ course, studentCount }) => ({
            courseCode: course.courseCode,
            courseName: course.courseName,
            programName: course.programId.programName,
            maxHoursPerDay: course.maxHoursPerDay,
            numMeetingTimes: course.numMeetingTimes,
            totalStudents: studentCount
        }));

        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
	initializeRoomAvailability,
	scheduleAllCourses,
	getCoursesWithStudentCounts,
	getAllCourses,
};
