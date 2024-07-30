const RoomAvailability = require("../models/RoomAvailability");
const Course = require("../models/Course");
const Day = require("../models/Day");
const Period = require("../models/Period");
const Program = require("../models/Program");
const Room = require("../models/Room");
const RoomType = require("../models/RoomType");
const YearGroup = require("../models/YearGroup");
const Student = require("../models/Student");
const StudentCourse = require("../models/StudentCourse");
const  TimeTable = require("../models/TimeTable");

const populateDatabase = async (req, res) => {
	try {
		console.log("Deletion ...");

		// Clear existing data
		await Promise.all([
			TimeTable.deleteMany({}),
			RoomAvailability.deleteMany({}),
			Course.deleteMany({}),
			Day.deleteMany({}),
			Period.deleteMany({}),
			Program.deleteMany({}),
			Room.deleteMany({}),
			RoomType.deleteMany({}),
			YearGroup.deleteMany({}),
			Student.deleteMany({}),
			StudentCourse.deleteMany({}),
		]);

		console.log("Populate roomtype ....");

		// Populate RoomType
		const roomTypes = [
			{ roomTypeName: "Lecture Hall", description: "Large lecture hall" },
			{ roomTypeName: "Laboratory", description: "Science lab" },
			{
				roomTypeName: "Computer Lab",
				description: "Computational Sciences lab",
			},
			{ roomTypeName: "Office", description: "Lecturer office" },
			{ roomTypeName: "Class", description: "Classroom" },
		];

		const savedRoomTypes = await RoomType.insertMany(roomTypes);
		console.log("Populate room ...");

		// Populate Room
		const rooms = [
			// { roomName: "FF1", roomCapacity: 230, roomTypeId: savedRoomTypes[4]._id },
			// { roomName: "FF2", roomCapacity: 220, roomTypeId: savedRoomTypes[0]._id },
			{ roomName: "FF3", roomCapacity: 200, roomTypeId: savedRoomTypes[1]._id },
			{ roomName: "FF4", roomCapacity: 150, roomTypeId: savedRoomTypes[2]._id },
			{ roomName: "FF5", roomCapacity: 2, roomTypeId: savedRoomTypes[3]._id },
		];
		const savedRooms = await Room.insertMany(rooms);
		console.log("Populate days...");

		// Populate Day
		const days = [
			{ dayName: "Monday" },
			{ dayName: "Tuesday" },
			{ dayName: "Wednesday" },
			{ dayName: "Thursday" },
			{ dayName: "Friday" },
		];
		const savedDays = await Day.insertMany(days);
		console.log("Populate Periods ...");

		// Populate Period
		const periods = [
			{ periodName: "1", periodRange: "08:00-09:00" },
			{ periodName: "2", periodRange: "09:00-10:00" },
			{ periodName: "3", periodRange: "10:00-11:00" },
			{ periodName: "4", periodRange: "11:00-12:00" },
			{ periodName: "5", periodRange: "12:00-13:00" },
			{ periodName: "6", periodRange: "13:00-14:00" },
			{ periodName: "7", periodRange: "14:00-15:00" },
			{ periodName: "8", periodRange: "15:00-16:00" },
			{ periodName: "9", periodRange: "16:00-17:00" },
			{ periodName: "10", periodRange: "17:00-18:00" },
		];
		const savedPeriods = await Period.insertMany(periods);
		console.log("Populate programs ...");

		// Populate Program
		const programs = [
			{ programName: "Computer Science" },
			{ programName: "Physics" },
			{ programName: "Biology" },
			{ programName: "Chemistry" },
			{ programName: "Mathematics" },
			{ programName: "BioChemistry" },
			{ programName: "Statistics" },
		];
		const savedPrograms = await Program.insertMany(programs);
		console.log("Populate year group ...");

		// Populate YearGroup
		const yearGroups = [
			{ name: "Year 1" },
			{ name: "Year 2" },
			{ name: "Year 3" },
			{ name: "Year 4" },
		];
		const savedYearGroups = await YearGroup.insertMany(yearGroups);
		console.log("Populate course ...");

		// Populate Course
		const courses = [
			{
				courseCode: "CSM111",
				courseName: "Intro To Computers",
				programId: savedPrograms[0]._id,
				maxHoursPerDay: 2,
				numMeetingTimes: 2,
				yearGroupId: savedYearGroups[0]._id,
			},
			{
				courseCode: "PHY121",
				courseName: "Intro To Hardware",
				programId: savedPrograms[1]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 1,
				yearGroupId: savedYearGroups[1]._id,
			},
			{
				courseCode: "AFC111",
				courseName: "Intro To Accounting",
				programId: savedPrograms[2]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 1,
				yearGroupId: savedYearGroups[2]._id,
			},
			{
				courseCode: "BIO101",
				courseName: "Biology Basics",
				programId: savedPrograms[3]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 1,
				yearGroupId: savedYearGroups[0]._id,
			},
			{
				courseCode: "CHE101",
				courseName: "Chemistry Basics",
				programId: savedPrograms[4]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 2,
				yearGroupId: savedYearGroups[0]._id,
			},
			{
				courseCode: "MTH101",
				courseName: "Mathematics I",
				programId: savedPrograms[5]._id,
				maxHoursPerDay: 2,
				numMeetingTimes: 3,
				yearGroupId: savedYearGroups[0]._id,
			},
			{
				courseCode: "ENG101",
				courseName: "English Composition",
				programId: savedPrograms[6]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 2,
				yearGroupId: savedYearGroups[1]._id,
			},
			{
				courseCode: "PHY201",
				courseName: "Advanced Physics",
				programId: savedPrograms[1]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 2,
				yearGroupId: savedYearGroups[2]._id,
			},
			{
				courseCode: "CSC201",
				courseName: "Data Structures",
				programId: savedPrograms[0]._id,
				maxHoursPerDay: 2,
				numMeetingTimes: 3,
				yearGroupId: savedYearGroups[1]._id,
			},
			{
				courseCode: "ECO101",
				courseName: "Introduction to Economics",
				programId: savedPrograms[6]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 2,
				yearGroupId: savedYearGroups[0]._id,
			},
			{
				courseCode: "STA101",
				courseName: "Statistics I",
				programId: savedPrograms[6]._id,
				maxHoursPerDay: 2,
				numMeetingTimes: 1,
				yearGroupId: savedYearGroups[1]._id,
			},
			{
				courseCode: "PSY101",
				courseName: "Introduction to Psychology",
				programId: savedPrograms[6]._id,
				maxHoursPerDay: 1,
				numMeetingTimes: 2,
				yearGroupId: savedYearGroups[1]._id,
			},
		];
		const savedCourses = await Course.insertMany(courses);
		console.log("Populate roomAvailability ...");

		// Assuming "Office" room type exists and was previously inserted
		const officeRoomType = await RoomType.findOne({ roomTypeName: "Office" });

		if (!officeRoomType) {
			throw new Error("Office room type not found");
		}

		// Filter rooms to only include those of type "Office"
		const officeRooms = savedRooms.filter(
			(room) => room.roomTypeId.toString() !== officeRoomType._id.toString()
		);

		const roomAvailabilityData = [];

		for (const room of officeRooms) {
			// Iterate over each day
			for (const day of savedDays) {
				// Iterate over each period
				for (const period of savedPeriods) {
					roomAvailabilityData.push({
						roomId: room._id,
						isAvailable: true,
						periodId: period._id,
						dayId: day._id,
					});
				}
			}
		}
		await RoomAvailability.insertMany(roomAvailabilityData);

		console.log("Populate students ...");

		// Generate additional students
		const additionalStudents = [];
		for (let i = 1; i <= 500; i++) {
			additionalStudents.push({
				email: `student${i}@example.com`,
				name: `Student ${i}`,
				indexNo: `S${i}`,
				programId:
					savedPrograms[Math.floor(Math.random() * savedPrograms.length)]._id,
				yearGroupId:
					savedYearGroups[Math.floor(Math.random() * savedYearGroups.length)]
						._id,
			});
		}

		const savedStudents = await Student.insertMany(additionalStudents);

		console.log("Populate student courses ...");

		// Populate StudentCourse
		const studentCourses = [];

		for (const student of savedStudents) {
			
			const randomCourses = savedCourses
				.sort(() => 0.5 - Math.random())
				.slice(0, 5);
			for (const course of randomCourses) {
				studentCourses.push({
					studentId: student._id,
					courseId: course._id,
				});
			}
		}

		await StudentCourse.insertMany(studentCourses);
		console.log("Database populated successfully");
		res.status(200).send("Database populated successfully");
	} catch (error) {
		console.error("Error populating the database:", error);
		res.status(500).send("Error populating the database");
	}
};

module.exports = { populateDatabase };
