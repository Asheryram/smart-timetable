const TimeTable = require("../models/TimeTable");
const RoomAvailability = require("../models/RoomAvailability");
const { getFilteredRooms } = require("./roomAvailabilityController");
const { getFilteredCourses } = require("./courseController");
const Room = require("../models/Room");
const Period = require("../models/Period");
const Day = require("../models/Day");
const Code = require("../models/Code");
const getAllSchedules = async (req, res) => {

	try {
		const latestCode = await Code.findOne().sort({ timestamp: -1 }).exec();
		if (!latestCode) {
			return res.status(200).json({ message: "No codes found" });
		}
		
		const code = latestCode.code
		console.log(code)

		const timeTable = await TimeTable.find({ code });
		res.status(200).json(timeTable);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const generateAllSchedules = async (req, res) => {
	try {
		// Generate a new code
		const newCode = `CODE-${Date.now()}`;
		const codeEntry = new Code({ code: newCode });
		await codeEntry.save();
		console.log("New code saved:", newCode);
		// Fetch all days
		const savedDays = await Day.find();
		console.log("Saved days:", savedDays);

		// Fetch all periods
		const savedPeriods = await Period.find();
		console.log("Saved periods:", savedPeriods);
		// Fetch all rooms with populated roomTypeId
		const allRooms = await Room.find().populate("roomTypeId");
		console.log("All rooms:", allRooms);

		// Filter rooms to exclude those with room type "Office"
		const nonOfficeRooms = allRooms.filter(
			(room) => room.roomTypeId.roomTypeName !== "Office"
		);
		console.log("Non-office rooms:", nonOfficeRooms);

		// Prepare room availability data
		const roomAvailabilityData = [];
		for (const room of nonOfficeRooms) {
			for (const day of savedDays) {
				for (const period of savedPeriods) {
					roomAvailabilityData.push({
						roomId: room._id,
						isAvailable: true,
						periodId: period._id,
						dayId: day._id,
						code: newCode,
					});
				}
			}
		}
		await RoomAvailability.insertMany(roomAvailabilityData);
		console.log("Room availability data inserted.");

		// Get filtered rooms and courses
		const roomsAvailability = await getFilteredRooms();
		console.log("Rooms availability:", roomsAvailability);

		const courses = await getFilteredCourses();
		console.log("Courses:", courses);

		// Generate timetable
		const scheduledTimetable = await timeTableAlgorithm(
			roomsAvailability,
			courses,
			newCode
		);
		console.log("Scheduled timetable:", scheduledTimetable);

		// Save the timetable
		await TimeTable.insertMany(scheduledTimetable);
		res.status(200).json({ scheduledTimetable, message: "success" });
	} catch (error) {
		console.error("Error in generateAllSchedules:", error);
		res.status(500).json({ error: error.message });
	}
};

const timeTableAlgorithm = async (roomsAvailability, courses, code) => {
	// Sort rooms in descending order of capacity (largest rooms first)
	let sortedRooms = roomsAvailability.sort((a, b) => b.capacity - a.capacity);
	// Sort courses in descending order of number of students (largest classes first)
	const sortedCourses = courses.sort(
		(a, b) => b.totalStudents - a.totalStudents
	);

	// Array to store the scheduled timetable entries
	const scheduledTimetable = [];
	// Array to track unscheduled courses
	const unscheduledCourses = [];

	// First scheduling for optimized rooms with their courses
	for (const course of sortedCourses) {
		let remainingMeetings = course.meetingTimesPerWeek;
		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		let dayIndex = 0;
		let courseAssigned = false;

		// Try to assign meetings to available rooms
		while (remainingMeetings > 0 && dayIndex < days.length) {
			const day = days[dayIndex];
			// Filter rooms based on availability and capacity for the current day
			const availableRooms = sortedRooms.filter(
				(room) =>
					room.day === day &&
					room.available &&
					room.capacity >= course.totalStudents &&
					room.classAssigned === "None"
			);

			// Try to schedule the course in the available rooms
			for (let room of availableRooms) {
				if (remainingMeetings <= 0) break;

				// Find available periods in the room
				const roomPeriods = sortedRooms.filter(
					(r) =>
						r.name === room.name &&
						r.day === day &&
						r.available &&
						r.classAssigned === "None"
				);

				if (roomPeriods.length >= course.meetingTimesPerDay) {
					// Schedule meetings for the course in the available periods
					for (
						let i = 0;
						i < course.meetingTimesPerDay && remainingMeetings > 0;
						i++
					) {
						const periodRoom = roomPeriods[i];

						scheduledTimetable.push({
							courseCode: course.courseCode,
							courseName: course.name,
							roomName: periodRoom.name,
							day: periodRoom.day,
							period: periodRoom.period,
							yearGroup: course.yearGroup,
							program: course.program,
							code,
							scheduled: true, // Mark as successfully scheduled
						});

						// Update room availability in the database
						const roomDoc = await Room.findOne({ roomName: periodRoom.name });
						const periodDoc = await Period.findOne({
							periodName: periodRoom.period,
						});
						const dayDoc = await Day.findOne({ dayName: periodRoom.day });

						if (roomDoc && periodDoc && dayDoc) {
							await RoomAvailability.updateOne(
								{
									roomId: roomDoc._id,
									dayId: dayDoc._id,
									periodId: periodDoc._id,
								},
								{ $set: { isAvailable: false } }
							);
						} else {
							console.warn("Room, period, or day not found for:", periodRoom);
						}

						// Update room state in the sortedRooms array
						periodRoom.classAssigned = course.courseCode;
						periodRoom.available = false;
						remainingMeetings -= 1;

						sortedRooms = sortedRooms.map((r) =>
							r.name === periodRoom.name &&
							r.day === periodRoom.day &&
							r.period === periodRoom.period
								? { ...r, available: false, classAssigned: course.courseCode }
								: r
						);
					}
					courseAssigned = true;
				}
			}
			dayIndex += 1;
		}

		// If there are remaining meetings that couldn't be scheduled
		if (!courseAssigned || remainingMeetings > 0) {
			unscheduledCourses.push({
				// courseCode: course.courseCode,
				// courseName: course.name,
				// yearGroup: course.yearGroup,
				// program: course.program,
				...course,
				courseName: course.name,
				code,
				scheduled: false, // Mark as unscheduled
			});
		}
	}
	console.log("Unscheduled array", unscheduledCourses);
	// Fetch updated room availability for unscheduled courses
	const updatedRoomsAvailability = await getFilteredRooms(); // Get current room availability

	// Sort updated rooms again in descending order of capacity for the second pass
	let sortedUpdatedRooms = updatedRoomsAvailability.sort(
		(a, b) => b.capacity - a.capacity
	);

	// ---------------------------------------------------------- Second scheduling after the optimal classes one is scheduled--------------------------------------------------
	for (const course of unscheduledCourses) {
		let remainingMeetings = course.meetingTimesPerWeek;
		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		let dayIndex = 0;

		// Try to assign meetings to available rooms
		while (remainingMeetings > 0 && dayIndex < days.length) {
			const day = days[dayIndex];
			// Filter rooms based on availability for the current day
			const availableRooms = sortedUpdatedRooms.filter(
				(room) =>
					room.day === day && room.available && room.classAssigned === "None"
			);

			// Try to schedule the course in the available rooms
			for (let room of availableRooms) {
				if (remainingMeetings <= 0) break;

				// Find available periods in the room
				const roomPeriods = sortedUpdatedRooms.filter(
					(r) =>
						r.name === room.name &&
						r.day === day &&
						r.available &&
						r.classAssigned === "None"
				);

				if (roomPeriods.length > 0) {
					// Schedule meetings for the course in the available periods
					for (
						let i = 0;
						i < roomPeriods.length && remainingMeetings > 0;
						i++
					) {
						const periodRoom = roomPeriods[i];

						scheduledTimetable.push({
							courseCode: course.courseCode,
							courseName: course.courseName,
							roomName: periodRoom.name,
							day: periodRoom.day,
							period: periodRoom.period,
							yearGroup: course.yearGroup,
							program: course.program,
							code,
							scheduled: false, // Indicate that it was scheduled in the second phase
						});
						// Update room availability in the database again
						const roomDoc = await Room.findOne({ roomName: periodRoom.name });
						const periodDoc = await Period.findOne({
							periodName: periodRoom.period,
						});
						const dayDoc = await Day.findOne({ dayName: periodRoom.day });

						if (roomDoc && periodDoc && dayDoc) {
							await RoomAvailability.updateOne(
								{
									roomId: roomDoc._id,
									dayId: dayDoc._id,
									periodId: periodDoc._id,
								},
								{ $set: { isAvailable: false } }
							);
						} else {
							console.warn("Room, period, or day not found for:", periodRoom);
						}

						// Update room state in the sortedUpdatedRooms array
						periodRoom.classAssigned = course.courseCode;
						periodRoom.available = false;
						remainingMeetings -= 1;

						sortedUpdatedRooms = sortedUpdatedRooms.map((r) =>
							r.name === periodRoom.name &&
							r.day === periodRoom.day &&
							r.period === periodRoom.period
								? { ...r, available: false, classAssigned: course.courseCode }
								: r
						);
					}
				}
			}
			dayIndex += 1;
		}
	}
	console.log(scheduledTimetable);

	return scheduledTimetable;
};

module.exports = {
	getAllSchedules,
	generateAllSchedules,
};
