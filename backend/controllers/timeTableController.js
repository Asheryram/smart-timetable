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

// const timeTableAlgorithm = async (roomsAvailability, courses, code) => {
// 	const sortedRooms = roomsAvailability.sort((a, b) => a.capacity - b.capacity);
// 	const sortedCourses = courses.sort(
// 		(a, b) => b.totalStudents - a.totalStudents
// 	);

// 	console.log("Sorted Rooms:", sortedRooms);
// 	console.log("Sorted Courses:", sortedCourses);

// 	const scheduledTimetable = [];
// 	sortedCourses.forEach(async (course) => {
// 		let remainingMeetings = course.meetingTimesPerWeek;
// 		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// 		let dayIndex = 0;
// 		let courseAssigned = false;

// 		while (remainingMeetings > 0 && dayIndex < days.length) {
// 			const day = days[dayIndex];
// 			const availableRooms = sortedRooms.filter(
// 				(room) =>
// 					room.day === day &&
// 					room.available &&
// 					room.capacity >= course.totalStudents &&
// 					room.classAssigned === "None"
// 			);
// 			for (let room of availableRooms) {
// 				if (remainingMeetings <= 0) break;
// 				const roomPeriods = sortedRooms.filter(
// 					(r) =>
// 						r.name === room.name &&
// 						r.day === day &&
// 						r.available &&
// 						r.classAssigned === "None"
// 				);

// 				if (roomPeriods.length >= course.meetingTimesPerDay) {
// 					for (
// 						let i = 0;
// 						i < course.meetingTimesPerDay && remainingMeetings > 0;
// 						i++
// 					) {
// 						const periodRoom = roomPeriods[i];
// 						scheduledTimetable.push({
// 							courseCode: course.courseCode,
// 							courseName: course.name,
// 							roomName: periodRoom.name,
// 							day: periodRoom.day,
// 							period: periodRoom.period,
// 							yearGroup: course.yearGroup,
// 							program: course.program,
// 							code,
// 							scheduled: true,
// 						});
// 						console.log("Updating this", {
// 							periodRoom,
// 						});

// 						const roomDoc = await Room.findOne({ roomName: periodRoom.name });
// 						const periodDoc = await Period.findOne({
// 							periodName: periodRoom.period,
// 						});
// 						const dayDoc = await Day.findOne({ dayName: periodRoom.day });

// 						if (roomDoc && periodDoc && dayDoc) {
// 							await RoomAvailability.updateOne(
// 								{
// 									roomId: roomDoc._id,
// 									dayId: dayDoc._id,
// 									periodId: periodDoc._id,
// 								},
// 								{ $set: { isAvailable: false } }
// 							);
// 						} else {
// 							console.warn("Room, period, or day not found for:", periodRoom);
// 						}

// 						periodRoom.classAssigned = course.courseCode;
// 						periodRoom.available = false;
// 						remainingMeetings -= 1;

// 						// Update the sortedRooms array to reflect the changes
// 						sortedRooms = sortedRooms.map((r) =>
// 							r.name === periodRoom.name &&
// 							r.day === periodRoom.day &&
// 							r.period === periodRoom.period
// 								? { ...r, available: false, classAssigned: course.courseCode }
// 								: r
// 						);
// 					}
// 					courseAssigned = true;
// 				}
// 			}

// 			dayIndex += 1;
// 		}

// 		if (!courseAssigned || remainingMeetings > 0) {
// 			for (let i = 0; i < course.meetingTimesPerWeek; i++) {
// 				scheduledTimetable.push({
// 					courseCode: course.courseCode,
// 					courseName: course.name,
// 					roomName: "",
// 					day: "",
// 					period: "",
// 					yearGroup: course.yearGroup,
// 					program: course.program,
// 					code,
// 					scheduled: false,
// 				});
// 			}
// 		}
// 	});

// 	console.log("Scheduled Timetable:", scheduledTimetable);

// 	return scheduledTimetable;
// };


const timeTableAlgorithm = async (roomsAvailability, courses, code) => {
    let sortedRooms = roomsAvailability.sort((a, b) => a.capacity - b.capacity);
    const sortedCourses = courses.sort((a, b) => b.totalStudents - a.totalStudents);

    console.log("Sorted Rooms:", sortedRooms);
    console.log("Sorted Courses:", sortedCourses);

    const scheduledTimetable = [];

    for (const course of sortedCourses) {
        let remainingMeetings = course.meetingTimesPerWeek;
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        let dayIndex = 0;
        let courseAssigned = false;

        while (remainingMeetings > 0 && dayIndex < days.length) {
            const day = days[dayIndex];
            const availableRooms = sortedRooms.filter(
                (room) =>
                    room.day === day &&
                    room.available &&
                    room.capacity >= course.totalStudents &&
                    room.classAssigned === "None"
            );

            for (let room of availableRooms) {
                if (remainingMeetings <= 0) break;

                const roomPeriods = sortedRooms.filter(
                    (r) =>
                        r.name === room.name &&
                        r.day === day &&
                        r.available &&
                        r.classAssigned === "None"
                );

                if (roomPeriods.length >= course.meetingTimesPerDay) {
                    for (let i = 0; i < course.meetingTimesPerDay && remainingMeetings > 0; i++) {
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
                            scheduled: true,
                        });

                        console.log("Updating this", { periodRoom });

                        const roomDoc = await Room.findOne({ roomName: periodRoom.name });
                        const periodDoc = await Period.findOne({ periodName: periodRoom.period });
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

        if (!courseAssigned || remainingMeetings > 0) {
            for (let i = 0; i < course.meetingTimesPerWeek; i++) {
                scheduledTimetable.push({
                    courseCode: course.courseCode,
                    courseName: course.name,
                    roomName: "",
                    day: "",
                    period: "",
                    yearGroup: course.yearGroup,
                    program: course.program,
                    code,
                    scheduled: false,
                });
            }
        }
    }

    console.log("Scheduled Timetable:", scheduledTimetable);

    return scheduledTimetable;
};


module.exports = {
	getAllSchedules,
	generateAllSchedules,
};
