const TimeTable = require("../models/TimeTable");
const { getFilteredRooms } = require("./roomAvailabilityController");
const { getFilteredCourses } = require("./courseController");

const getAllSchedules = async (req, res) => {
	const {code} = req.params
	try {
		const timeTable = await TimeTable.find({code});
		res.status(200).json(timeTable);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const generateAllSchedules = async (req, res) => {
    const {code} = req.params;
	try {
		const roomsAvailability = await getFilteredRooms();
		const courses = await getFilteredCourses();
        
		const scheduledTimetable = await timeTableAlgorithm(roomsAvailability, courses,code);
        await TimeTable.insertMany(scheduledTimetable)
		res.status(200).json({scheduledTimetable, message : "success"});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const timeTableAlgorithm = async (roomsAvailability, courses,code) => {
	const sortedRooms = roomsAvailability.sort((a, b) => a.capacity - b.capacity);
	const sortedCourses = courses.sort((a, b) => b.totalStudents - a.totalStudents);

	console.log("Sorted Rooms:", sortedRooms);
	console.log("Sorted Courses:", sortedCourses);

	const scheduledTimetable = []; 
	sortedCourses.forEach(course => {
		let remainingMeetings = course.meetingTimesPerWeek;
		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		let dayIndex = 0;
		let courseAssigned = false;

		while (remainingMeetings > 0 && dayIndex < days.length) {
			const day = days[dayIndex];
			const availableRooms = sortedRooms.filter(room =>
				room.day === day &&
				room.available &&
				room.capacity >= course.totalStudents &&
				room.classAssigned === "None"
			);
			for (let room of availableRooms) {
				if (remainingMeetings <= 0) break;
				const roomPeriods = sortedRooms.filter(r =>
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
							scheduled: true
						});

						periodRoom.classAssigned = course.courseCode;
						periodRoom.available = false;
						remainingMeetings -= 1;
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
					roomName: '',
					day: '',
					period: '',
					yearGroup: course.yearGroup,
					program: course.program,
                    code,
					scheduled: false
				});
			}
		}
	});

	console.log("Scheduled Timetable:", scheduledTimetable);

	return scheduledTimetable;
};

module.exports = {
	getAllSchedules,
	generateAllSchedules,
};
