const TimeTable = require("../models/TimeTable");
const RoomAvailability = require("../models/RoomAvailability");
const { getFilteredRooms } = require("./roomAvailabilityController");
const { getFilteredCourses } = require("./courseController");
const Room = require("../models/Room");
const Period = require("../models/Period");
const Day = require("../models/Day");

const getAllSchedules = async (req, res) => {
	const { code } = req.params;
	try {
		const timeTable = await TimeTable.find({ code });
		res.status(200).json(timeTable);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const generateAllSchedules = async (req, res) => {
	const { code } = req.params;
	try {
		const roomsAvailability = await getFilteredRooms();
		const courses = await getFilteredCourses();

		const scheduledTimetable = await timeTableAlgorithm(
			roomsAvailability,
			courses,
			code
		);
		await TimeTable.insertMany(scheduledTimetable);
		res.status(200).json({ scheduledTimetable, message: "success" });
	} catch (error) {
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
console.log("Unscheduled array", unscheduledCourses)
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
	console.log(scheduledTimetable)

	return scheduledTimetable;
};

// const timeTableAlgorithm = async (roomsAvailability, courses, code) => {
//     let sortedRooms = roomsAvailability.sort((a, b) => a.capacity - b.capacity);
//     const sortedCourses = courses.sort((a, b) => b.totalStudents - a.totalStudents);

//     console.log("Sorted Rooms:", sortedRooms);
//     console.log("Sorted Courses:", sortedCourses);

//     const scheduledTimetable = [];

//     for (const course of sortedCourses) {
//         let remainingMeetings = course.meetingTimesPerWeek;
//         const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//         let dayIndex = 0;
//         let courseAssigned = false;

//         while (remainingMeetings > 0 && dayIndex < days.length) {
//             const day = days[dayIndex];
//             const availableRooms = sortedRooms.filter(
//                 (room) =>
//                     room.day === day &&
//                     room.available &&
//                     room.capacity >= course.totalStudents &&
//                     room.classAssigned === "None"
//             );

//             for (let room of availableRooms) {
//                 if (remainingMeetings <= 0) break;

//                 const roomPeriods = sortedRooms.filter(
//                     (r) =>
//                         r.name === room.name &&
//                         r.day === day &&
//                         r.available &&
//                         r.classAssigned === "None"
//                 );

//                 if (roomPeriods.length >= course.meetingTimesPerDay) {
//                     for (let i = 0; i < course.meetingTimesPerDay && remainingMeetings > 0; i++) {
//                         const periodRoom = roomPeriods[i];

//                         scheduledTimetable.push({
//                             courseCode: course.courseCode,
//                             courseName: course.name,
//                             roomName: periodRoom.name,
//                             day: periodRoom.day,
//                             period: periodRoom.period,
//                             yearGroup: course.yearGroup,
//                             program: course.program,
//                             code,
//                             scheduled: true,
//                         });

//                         console.log("Updating this", { periodRoom });

//                         const roomDoc = await Room.findOne({ roomName: periodRoom.name });
//                         const periodDoc = await Period.findOne({ periodName: periodRoom.period });
//                         const dayDoc = await Day.findOne({ dayName: periodRoom.day });

//                         if (roomDoc && periodDoc && dayDoc) {
//                             await RoomAvailability.updateOne(
//                                 {
//                                     roomId: roomDoc._id,
//                                     dayId: dayDoc._id,
//                                     periodId: periodDoc._id,
//                                 },
//                                 { $set: { isAvailable: false } }
//                             );
//                         } else {
//                             console.warn("Room, period, or day not found for:", periodRoom);
//                         }

//                         periodRoom.classAssigned = course.courseCode;
//                         periodRoom.available = false;
//                         remainingMeetings -= 1;

//                         sortedRooms = sortedRooms.map((r) =>
//                             r.name === periodRoom.name &&
//                             r.day === periodRoom.day &&
//                             r.period === periodRoom.period
//                                 ? { ...r, available: false, classAssigned: course.courseCode }
//                                 : r
//                         );
//                     }
//                     courseAssigned = true;
//                 }
//             }
//             dayIndex += 1;
//         }

//         if (!courseAssigned || remainingMeetings > 0) {
//             for (let i = 0; i < course.meetingTimesPerWeek; i++) {
//                 scheduledTimetable.push({
//                     courseCode: course.courseCode,
//                     courseName: course.name,
//                     roomName: "",
//                     day: "",
//                     period: "",
//                     yearGroup: course.yearGroup,
//                     program: course.program,
//                     code,
//                     scheduled: false,
//                 });
//             }
//         }
//     }

//     console.log("Scheduled Timetable:", scheduledTimetable);

//     return scheduledTimetable;
// };

module.exports = {
	getAllSchedules,
	generateAllSchedules,
};
