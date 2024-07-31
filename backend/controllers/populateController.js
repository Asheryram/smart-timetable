const RoomAvailability = require("../models/RoomAvailability");
const Course = require("../models/Course");
const CourseInstance = require("../models/CourseInstance");
const Day = require("../models/Day");
const Period = require("../models/Period");
const Program = require("../models/Program");
const Room = require("../models/Room");
const RoomType = require("../models/RoomType");
const YearGroup = require("../models/YearGroup");
const Student = require("../models/Student");
const StudentCourse = require("../models/StudentCourse");
const TimeTable = require("../models/TimeTable");

const populateDatabase = async (req, res) => {
    try {
        console.log("Deletion ...");

        // Clear existing data
        await Promise.all([
            TimeTable.deleteMany({}),
            RoomAvailability.deleteMany({}),
            CourseInstance.deleteMany({}),
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
            { roomTypeName: "Computer Lab", description: "Computational Sciences lab" },
            { roomTypeName: "Office", description: "Lecturer office" },
            { roomTypeName: "Class", description: "Classroom" },
        ];

        const savedRoomTypes = await RoomType.insertMany(roomTypes);
        console.log("Populate room ...");

        // Populate Room
        const rooms = [
            { roomName: "FF1", roomCapacity: 230, roomTypeId: savedRoomTypes[4]._id },
            { roomName: "FF2", roomCapacity: 220, roomTypeId: savedRoomTypes[0]._id },
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

        // Populate Program for College of Sciences
        const programs = [
            { programName: "Computer Science" },
            { programName: "Physics" },
            { programName: "Biology" },
            { programName: "Chemistry" },
            { programName: "Mathematics" },
            { programName: "Astrophysics" },
            { programName: "Bioinformatics" },
            { programName: "Environmental Science" },
            { programName: "Data Science" },
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
        console.log("Populate courses ...");

        // Populate Course for College of Sciences
        const courses = [
            { courseCode: "CSM111", courseName: "Intro To Computers" },
            { courseCode: "PHY121", courseName: "Intro To Hardware" },
            { courseCode: "CHE101", courseName: "Chemistry Basics" },
            { courseCode: "BIO101", courseName: "Biology Basics" },
            { courseCode: "MTH101", courseName: "Mathematics I" },
            { courseCode: "CSM201", courseName: "Advanced Programming" },
            { courseCode: "PHY201", courseName: "Advanced Physics" },
            { courseCode: "CHE201", courseName: "Organic Chemistry" },
            { courseCode: "BIO201", courseName: "Genetics" },
            { courseCode: "MTH201", courseName: "Calculus II" },
            { courseCode: "CSM301", courseName: "Algorithms and Data Structures" },
            { courseCode: "PHY301", courseName: "Quantum Mechanics" },
            { courseCode: "CHE301", courseName: "Physical Chemistry" },
            { courseCode: "BIO301", courseName: "Microbiology" },
            { courseCode: "MTH301", courseName: "Linear Algebra" },
            { courseCode: "CSM401", courseName: "Machine Learning" },
            { courseCode: "PHY401", courseName: "Astrophysics" },
            { courseCode: "CHE401", courseName: "Inorganic Chemistry" },
            { courseCode: "BIO401", courseName: "Evolutionary Biology" },
            { courseCode: "MTH401", courseName: "Differential Equations" },
        ];
        const savedCourses = await Course.insertMany(courses);

        console.log("Populate course instances ...");

        // Populate CourseInstance for College of Sciences
        const courseInstances = [
            {
                courseId: savedCourses[0]._id, // CSM111
                programId: savedPrograms[0]._id, // Computer Science
                yearGroupId: savedYearGroups[0]._id, // Year 1
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[1]._id, // PHY121
                programId: savedPrograms[1]._id, // Physics
                yearGroupId: savedYearGroups[0]._id, // Year 1
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[2]._id, // CHE101
                programId: savedPrograms[2]._id, // Chemistry
                yearGroupId: savedYearGroups[0]._id, // Year 1
                maxHoursPerDay: 2,
                numMeetingTimes: 3,
            },
            {
                courseId: savedCourses[3]._id, // BIO101
                programId: savedPrograms[2]._id, // Biology
                yearGroupId: savedYearGroups[0]._id, // Year 1
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[4]._id, // MTH101
                programId: savedPrograms[4]._id, // Mathematics
                yearGroupId: savedYearGroups[0]._id, // Year 1
                maxHoursPerDay: 2,
                numMeetingTimes: 3,
            },
            {
                courseId: savedCourses[5]._id, // CSM201
                programId: savedPrograms[0]._id, // Computer Science
                yearGroupId: savedYearGroups[1]._id, // Year 2
                maxHoursPerDay: 2,
                numMeetingTimes: 3,
            },
            {
                courseId: savedCourses[6]._id, // PHY201
                programId: savedPrograms[1]._id, // Physics
                yearGroupId: savedYearGroups[1]._id, // Year 2
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[7]._id, // CHE201
                programId: savedPrograms[2]._id, // Chemistry
                yearGroupId: savedYearGroups[1]._id, // Year 2
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[8]._id, // BIO201
                programId: savedPrograms[2]._id, // Biology
                yearGroupId: savedYearGroups[1]._id, // Year 2
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[9]._id, // MTH201
                programId: savedPrograms[4]._id, // Mathematics
                yearGroupId: savedYearGroups[1]._id, // Year 2
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[10]._id, // CSM301
                programId: savedPrograms[0]._id, // Computer Science
                yearGroupId: savedYearGroups[2]._id, // Year 3
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[11]._id, // PHY301
                programId: savedPrograms[1]._id, // Physics
                yearGroupId: savedYearGroups[2]._id, // Year 3
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[12]._id, // CHE301
                programId: savedPrograms[2]._id, // Chemistry
                yearGroupId: savedYearGroups[2]._id, // Year 3
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[13]._id, // BIO301
                programId: savedPrograms[2]._id, // Biology
                yearGroupId: savedYearGroups[2]._id, // Year 3
                maxHoursPerDay: 2,
                numMeetingTimes: 3,
            },
            {
                courseId: savedCourses[14]._id, // MTH301
                programId: savedPrograms[4]._id, // Mathematics
                yearGroupId: savedYearGroups[2]._id, // Year 3
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[15]._id, // CSM401
                programId: savedPrograms[0]._id, // Computer Science
                yearGroupId: savedYearGroups[3]._id, // Year 4
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[16]._id, // PHY401
                programId: savedPrograms[1]._id, // Physics
                yearGroupId: savedYearGroups[3]._id, // Year 4
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[17]._id, // CHE401
                programId: savedPrograms[2]._id, // Chemistry
                yearGroupId: savedYearGroups[3]._id, // Year 4
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[18]._id, // BIO401
                programId: savedPrograms[2]._id, // Biology
                yearGroupId: savedYearGroups[3]._id, // Year 4
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
            {
                courseId: savedCourses[19]._id, // MTH401
                programId: savedPrograms[4]._id, // Mathematics
                yearGroupId: savedYearGroups[3]._id, // Year 4
                maxHoursPerDay: 2,
                numMeetingTimes: 2,
            },
        ];
        const savedCourseInstances = await CourseInstance.insertMany(courseInstances);

        console.log("Populate roomAvailability ...");

        // Populate RoomAvailability
        const officeRoomType = await RoomType.findOne({ roomTypeName: "Office" });

        if (!officeRoomType) {
            throw new Error("Office room type not found");
        }

        // Filter rooms to only include those of type "Office"
        const officeRooms = savedRooms.filter(
            (room) => room.roomTypeId.toString() === officeRoomType._id.toString()
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


        console.log("Populate students ...");

        // Generate additional students for College of Sciences
        const additionalStudents = [];
        for (let i = 1; i <= 1000; i++) { // Increased number of students
            additionalStudents.push({
                email: `science_student${i}@example.com`,
                name: `Science Student ${i}`,
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
            const randomCourseInstances = savedCourseInstances
                .filter(instance => instance.programId.toString() === student.programId.toString())
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * 5) + 1);
            for (const courseInstance of randomCourseInstances) {
                studentCourses.push({
                    studentId: student._id,
                    courseInstanceId: courseInstance._id,
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







// const RoomAvailability = require("../models/RoomAvailability");
// const Course = require("../models/Course");
// const CourseInstance = require("../models/CourseInstance");
// const Day = require("../models/Day");
// const Period = require("../models/Period");
// const Program = require("../models/Program");
// const Room = require("../models/Room");
// const RoomType = require("../models/RoomType");
// const YearGroup = require("../models/YearGroup");
// const Student = require("../models/Student");
// const StudentCourse = require("../models/StudentCourse");
// const TimeTable = require("../models/TimeTable");

// const populateDatabase = async (req, res) => {
//     try {
//         console.log("Deletion ...");

//         // Clear existing data
//         await Promise.all([
//             TimeTable.deleteMany({}),
//             RoomAvailability.deleteMany({}),
//             CourseInstance.deleteMany({}),
//             Course.deleteMany({}),
//             Day.deleteMany({}),
//             Period.deleteMany({}),
//             Program.deleteMany({}),
//             Room.deleteMany({}),
//             RoomType.deleteMany({}),
//             YearGroup.deleteMany({}),
//             Student.deleteMany({}),
//             StudentCourse.deleteMany({}),
//         ]);

//         console.log("Populate roomtype ....");

//         // Populate RoomType
//         const roomTypes = [
//             { roomTypeName: "Lecture Hall", description: "Large lecture hall" },
//             { roomTypeName: "Laboratory", description: "Science lab" },
//             { roomTypeName: "Computer Lab", description: "Computational Sciences lab" },
//             { roomTypeName: "Office", description: "Lecturer office" },
//             { roomTypeName: "Class", description: "Classroom" },
//         ];

//         const savedRoomTypes = await RoomType.insertMany(roomTypes);
//         console.log("Populate room ...");

//         // Populate Room
//         const rooms = [
//             // { roomName: "FF1", roomCapacity: 230, roomTypeId: savedRoomTypes[4]._id },
//             // { roomName: "FF2", roomCapacity: 220, roomTypeId: savedRoomTypes[0]._id },
//             { roomName: "FF3", roomCapacity: 200, roomTypeId: savedRoomTypes[1]._id },
//             { roomName: "FF4", roomCapacity: 150, roomTypeId: savedRoomTypes[2]._id },
//             { roomName: "FF5", roomCapacity: 2, roomTypeId: savedRoomTypes[3]._id },
//         ];
//         const savedRooms = await Room.insertMany(rooms);
//         console.log("Populate days...");

//         // Populate Day
//         const days = [
//             { dayName: "Monday" },
//             { dayName: "Tuesday" },
//             { dayName: "Wednesday" },
//             { dayName: "Thursday" },
//             { dayName: "Friday" },
//         ];
//         const savedDays = await Day.insertMany(days);
//         console.log("Populate Periods ...");

//         // Populate Period
//         const periods = [
//             { periodName: "1", periodRange: "08:00-09:00" },
//             { periodName: "2", periodRange: "09:00-10:00" },
//             { periodName: "3", periodRange: "10:00-11:00" },
//             { periodName: "4", periodRange: "11:00-12:00" },
//             { periodName: "5", periodRange: "12:00-13:00" },
//             { periodName: "6", periodRange: "13:00-14:00" },
//             { periodName: "7", periodRange: "14:00-15:00" },
//             { periodName: "8", periodRange: "15:00-16:00" },
//             { periodName: "9", periodRange: "16:00-17:00" },
//             { periodName: "10", periodRange: "17:00-18:00" },
//         ];
//         const savedPeriods = await Period.insertMany(periods);
//         console.log("Populate programs ...");

//         // Populate Program
//         const programs = [
//             { programName: "Computer Science" },
//             { programName: "Physics" },
//             { programName: "Biology" },
//             { programName: "Chemistry" },
//             { programName: "Mathematics" },
//             { programName: "BioChemistry" },
//             { programName: "Statistics" },
//         ];
//         const savedPrograms = await Program.insertMany(programs);
//         console.log("Populate year group ...");

//         // Populate YearGroup
//         const yearGroups = [
//             { name: "Year 1" },
//             { name: "Year 2" },
//             { name: "Year 3" },
//             { name: "Year 4" },
//         ];
//         const savedYearGroups = await YearGroup.insertMany(yearGroups);
//         console.log("Populate courses ...");

//         // Populate Course
//         const courses = [
//             {
//                 courseCode: "CSM111",
//                 courseName: "Intro To Computers",
//             },
//             {
//                 courseCode: "PHY121",
//                 courseName: "Intro To Hardware",
//             },
//             {
//                 courseCode: "AFC111",
//                 courseName: "Intro To Accounting",
//             },
//             {
//                 courseCode: "BIO101",
//                 courseName: "Biology Basics",
//             },
//             {
//                 courseCode: "CHE101",
//                 courseName: "Chemistry Basics",
//             },
//             {
//                 courseCode: "MTH101",
//                 courseName: "Mathematics I",
//             },
//             {
//                 courseCode: "ENG101",
//                 courseName: "English Composition",
//             },
//             {
//                 courseCode: "PHY201",
//                 courseName: "Advanced Physics",
//             },
//             {
//                 courseCode: "CSC201",
//                 courseName: "Data Structures",
//             },
//             {
//                 courseCode: "ECO101",
//                 courseName: "Introduction to Economics",
//             },
//             {
//                 courseCode: "STA101",
//                 courseName: "Statistics I",
//             },
//             {
//                 courseCode: "PSY101",
//                 courseName: "Introduction to Psychology",
//             },
//         ];
//         const savedCourses = await Course.insertMany(courses);

//         console.log("Populate course instances ...");

//         // Populate CourseInstance
//         const courseInstances = [
//             {
//                 courseId: savedCourses[0]._id, // CSM111
//                 programId: savedPrograms[0]._id, // Computer Science
//                 yearGroupId: savedYearGroups[0]._id, // Year 1
//                 maxHoursPerDay: 2,
//                 numMeetingTimes: 2,
//             },
//             {
//                 courseId: savedCourses[1]._id, // PHY121
//                 programId: savedPrograms[1]._id, // Physics
//                 yearGroupId: savedYearGroups[1]._id, // Year 2
//                 maxHoursPerDay: 1,
//                 numMeetingTimes: 1,
//             },
//             // ... Add more course instances for other combinations
//             {
//                 courseId: savedCourses[5]._id, // MTH101
//                 programId: savedPrograms[0]._id, // Computer Science
//                 yearGroupId: savedYearGroups[0]._id, // Year 1
//                 maxHoursPerDay: 2,
//                 numMeetingTimes: 3,
//             },
//             {
//                 courseId: savedCourses[5]._id, // MTH101
//                 programId: savedPrograms[6]._id, // Economics
//                 yearGroupId: savedYearGroups[0]._id, // Year 1
//                 maxHoursPerDay: 2,
//                 numMeetingTimes: 3,
//             },
//         ];
//         const savedCourseInstances = await CourseInstance.insertMany(courseInstances);

//         console.log("Populate roomAvailability ...");

//         // Assuming "Office" room type exists and was previously inserted
//         const officeRoomType = await RoomType.findOne({ roomTypeName: "Office" });

//         if (!officeRoomType) {
//             throw new Error("Office room type not found");
//         }

//         // Filter rooms to only include those of type "Office"
//         const officeRooms = savedRooms.filter(
//             (room) => room.roomTypeId.toString() !== officeRoomType._id.toString()
//         );

//         const roomAvailabilityData = [];

//         for (const room of officeRooms) {
//             // Iterate over each day
//             for (const day of savedDays) {
//                 // Iterate over each period
//                 for (const period of savedPeriods) {
//                     roomAvailabilityData.push({
//                         roomId: room._id,
//                         isAvailable: true,
//                         periodId: period._id,
//                         dayId: day._id,
//                     });
//                 }
//             }
//         }

//         console.log("Populate students ...");

//         // Generate additional students
//         const additionalStudents = [];
//         for (let i = 1; i <= 500; i++) {
//             additionalStudents.push({
//                 email: `student${i}@example.com`,
//                 name: `Student ${i}`,
//                 indexNo: `S${i}`,
//                 programId:
//                     savedPrograms[Math.floor(Math.random() * savedPrograms.length)]._id,
//                 yearGroupId:
//                     savedYearGroups[Math.floor(Math.random() * savedYearGroups.length)]
//                         ._id,
//             });
//         }

//         const savedStudents = await Student.insertMany(additionalStudents);

//         console.log("Populate student courses ...");

//         // Populate StudentCourse
//         const studentCourses = [];

    

// 	  for (const student of savedStudents) {
// 		  const randomCourseInstances = savedCourseInstances
// 			  .sort(() => 0.5 - Math.random())
// 			  .slice(0, Math.floor(Math.random() * 5) + 1);
// 		  for (const courseInstance of randomCourseInstances) {
// 			  studentCourses.push({
// 				  studentId: student._id,
// 				  courseInstanceId: courseInstance._id,
// 			  });
// 		  }
// 	  }

//         await StudentCourse.insertMany(studentCourses);
//         console.log("Database populated successfully");
//         res.status(200).send("Database populated successfully");
//     } catch (error) {
//         console.error("Error populating the database:", error);
//         res.status(500).send("Error populating the database");
//     }
// };

// module.exports = { populateDatabase };
