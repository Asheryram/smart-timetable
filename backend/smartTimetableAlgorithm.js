const roomsAvailability = [
    { name: "FF1", capacity: 70, available: true, period: 1, day: "Monday", classAssigned: "None" },
    { name: "FF1", capacity: 70, available: true, period: 2, day: "Monday", classAssigned: "None" },
    { name: "FF1", capacity: 70, available: true, period: 3, day: "Monday", classAssigned: "None" },
    { name: "FF1", capacity: 70, available: true, period: 4, day: "Monday", classAssigned: "None" },
    { name: "FF1", capacity: 70, available: true, period: 5, day: "Monday", classAssigned: "None" },
    { name: "FF1", capacity: 70, available: true, period: 6, day: "Monday", classAssigned: "None" },
    { name: "FF2", capacity: 90, available: true, period: 1, day: "Monday", classAssigned: "None" },
    { name: "FF2", capacity: 90, available: true, period: 2, day: "Monday", classAssigned: "None" },
    { name: "FF2", capacity: 90, available: true, period: 3, day: "Monday", classAssigned: "None" },
    { name: "FF2", capacity: 90, available: true, period: 4, day: "Monday", classAssigned: "None" },
    { name: "FF2", capacity: 90, available: true, period: 5, day: "Monday", classAssigned: "None" },
    { name: "FF2", capacity: 90, available: true, period: 6, day: "Monday", classAssigned: "None" },
    { name: "FF3", capacity: 60, available: true, period: 1, day: "Tuesday", classAssigned: "None" },
    { name: "FF3", capacity: 60, available: true, period: 2, day: "Tuesday", classAssigned: "None" },
    { name: "FF3", capacity: 60, available: true, period: 3, day: "Tuesday", classAssigned: "None" },
    { name: "FF3", capacity: 60, available: true, period: 4, day: "Tuesday", classAssigned: "None" },
    { name: "FF3", capacity: 60, available: true, period: 5, day: "Tuesday", classAssigned: "None" },
    { name: "FF3", capacity: 60, available: true, period: 6, day: "Tuesday", classAssigned: "None" },
    { name: "FF4", capacity: 80, available: true, period: 1, day: "Wednesday", classAssigned: "None" },
    { name: "FF4", capacity: 80, available: true, period: 2, day: "Wednesday", classAssigned: "None" },
    { name: "FF4", capacity: 80, available: true, period: 3, day: "Wednesday", classAssigned: "None" },
    { name: "FF4", capacity: 80, available: true, period: 4, day: "Wednesday", classAssigned: "None" },
    { name: "FF4", capacity: 80, available: true, period: 5, day: "Wednesday", classAssigned: "None" },
    { name: "FF4", capacity: 80, available: true, period: 6, day: "Wednesday", classAssigned: "None" },
    // { name: "FF5", capacity: 100, available: true, period: 1, day: "Thursday", classAssigned: "None" },
    // { name: "FF5", capacity: 100, available: true, period: 2, day: "Thursday", classAssigned: "None" },
    // { name: "FF5", capacity: 100, available: true, period: 3, day: "Thursday", classAssigned: "None" },
    // { name: "FF5", capacity: 100, available: true, period: 4, day: "Thursday", classAssigned: "None" },
    // { name: "FF5", capacity: 100, available: true, period: 5, day: "Thursday", classAssigned: "None" },
    { name: "FF5", capacity: 100, available: true, period: 6, day: "Thursday", classAssigned: "None" }
];

const courses = [
    { courseCode: "CSM111", name: "Intro To Computers", meetingTimesPerDay: 2, meetingTimesPerWeek: 2, totalStudents: 600, yearGroup: "1", program: "CS", assigned: false },
    { courseCode: "PHY121", name: "Intro To Hardware", meetingTimesPerDay: 1, meetingTimesPerWeek: 1, totalStudents: 40, yearGroup: "2", program: "Physics", assigned: false },
    { courseCode: "AFC111", name: "Intro To Accounting", meetingTimesPerDay: 1, meetingTimesPerWeek: 1, totalStudents: 100, yearGroup: "3", program: "Accounting", assigned: false },
    { courseCode: "BIO101", name: "Biology Basics", meetingTimesPerDay: 1, meetingTimesPerWeek: 1, totalStudents: 100, yearGroup: "1", program: "Biology", assigned: false },
    { courseCode: "CHE101", name: "Chemistry Basics", meetingTimesPerDay: 1, meetingTimesPerWeek: 2, totalStudents: 45, yearGroup: "1", program: "Chemistry", assigned: false },
    { courseCode: "MTH101", name: "Mathematics I", meetingTimesPerDay: 2, meetingTimesPerWeek: 3, totalStudents: 70, yearGroup: "1", program: "Mathematics", assigned: false },
    { courseCode: "ENG101", name: "English Composition", meetingTimesPerDay: 1, meetingTimesPerWeek: 2, totalStudents: 55, yearGroup: "2", program: "English", assigned: false },
    { courseCode: "HIS101", name: "World History", meetingTimesPerDay: 1, meetingTimesPerWeek: 1, totalStudents: 35, yearGroup: "3", program: "History", assigned: false },
    { courseCode: "PHY201", name: "Advanced Physics", meetingTimesPerDay: 1, meetingTimesPerWeek: 2, totalStudents: 50, yearGroup: "3", program: "Physics", assigned: false },
    { courseCode: "CSC201", name: "Data Structures", meetingTimesPerDay: 2, meetingTimesPerWeek: 3, totalStudents: 60, yearGroup: "2", program: "CS", assigned: false },
    { courseCode: "ECO101", name: "Introduction to Economics", meetingTimesPerDay: 1, meetingTimesPerWeek: 2, totalStudents: 40, yearGroup: "1", program: "Economics", assigned: false },
    { courseCode: "STA101", name: "Statistics I", meetingTimesPerDay: 2, meetingTimesPerWeek: 1, totalStudents: 30, yearGroup: "2", program: "Statistics", assigned: false },
    { courseCode: "ART101", name: "Art History", meetingTimesPerDay: 1, meetingTimesPerWeek: 1, totalStudents: 20, yearGroup: "1", program: "Art", assigned: false },
    { courseCode: "PSY101", name: "Introduction to Psychology", meetingTimesPerDay: 1, meetingTimesPerWeek: 2, totalStudents: 40, yearGroup: "2", program: "Psychology", assigned: false }
];

// const sortedRooms = roomsAvailability.sort((a, b) => a.capacity - b.capacity);
// const sortedCourses = courses.sort((a, b) => b.totalStudents - a.totalStudents);

// const scheduledTimetable = [];

// sortedCourses.forEach(course => {
//     let remainingMeetings = course.meetingTimesPerWeek;
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//     let dayIndex = 0;

//     while (remainingMeetings > 0 && dayIndex < days.length) {
//         const day = days[dayIndex];
//         const availableRooms = sortedRooms.filter(room =>
//             room.day === day &&
//             room.available &&
//             room.capacity >= course.totalStudents &&
//             room.classAssigned === "None"
//         );

//         for (let room of availableRooms) {
//             if (remainingMeetings <= 0) break;

//             const roomPeriods = sortedRooms.filter(r =>
//                 r.name === room.name &&
//                 r.day === day &&
//                 r.available &&
//                 r.classAssigned === "None"
//             );

//             if (roomPeriods.length >= course.meetingTimesPerDay) {
//                 for (let i = 0; i < course.meetingTimesPerDay && remainingMeetings > 0; i++) {
//                     const periodRoom = roomPeriods[i];
//                     scheduledTimetable.push({
//                         courseCode: course.courseCode,
//                         courseName: course.name,
//                         roomName: periodRoom.name,
//                         day: periodRoom.day,
//                         period: periodRoom.period,
//                         yearGroup: course.yearGroup,
//                         program: course.program,
//                         scheduled: true
//                     });

//                     periodRoom.classAssigned = course.courseCode;
//                     periodRoom.available = false;
//                     remainingMeetings -= 1;
//                 }
//                 course.assigned = true;
//             }
//         }

//         dayIndex += 1;
//     }

//     if (!course.assigned || remainingMeetings > 0) {
//         course.assigned = false;
//         for (let i = 0; i < course.meetingTimesPerWeek; i++) {
//             scheduledTimetable.push({
//                 courseCode: course.courseCode,
//                 courseName: course.name,
//                 roomName: null,
//                 day: null,
//                 period: null,
//                 yearGroup: course.yearGroup,
//                 program: course.program,
//                 scheduled: false
//             });
//         }
//     }
// });




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
            courseCode: course.courseCode,
            courseName: course.name,
            yearGroup: course.yearGroup,
            program: course.program,
            code,
            scheduled: false, // Mark as unscheduled
        });
    }
}

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

const timetableByRoom = scheduledTimetable.reduce((acc, curr) => {
    if (curr.scheduled) {
        if (!acc[curr.roomName]) {
            acc[curr.roomName] = {};
        }
        if (!acc[curr.roomName][curr.day]) {
            acc[curr.roomName][curr.day] = {};
        }
        acc[curr.roomName][curr.day][curr.period] = curr;
    }
    return acc;
}, {});

const timetableByYearGroupAndProgram = scheduledTimetable.reduce((acc, curr) => {
    if (curr.scheduled) {
        const key = `${curr.program} ${curr.yearGroup}`;
        if (!acc[key]) {
            acc[key] = {};
        }
        if (!acc[key][curr.day]) {
            acc[key][curr.day] = {};
        }
        acc[key][curr.day][curr.period] = curr;
    }
    return acc;
}, {});

function printRoomTimetable(timetable, label) {
    console.log(`\n${label} Timetable:`);
    for (const key in timetable) {
        console.log(`\n${label} ${key}`);
        console.log("Days    | Period 1       | Period 2       | Period 3       | Period 4       | Period 5       | Period 6       | Period 7       | Period 8       | Period 9       | Period 10      ");
        console.log("--------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------");

        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach(day => {
            const row = [day];
            for (let period = 1; period <= 10; period++) {
                if (timetable[key][day] && timetable[key][day][period]) {
                    const { courseCode, program ,yearGroup} = timetable[key][day][period];
                    row.push(`${courseCode}  ${program} ${yearGroup}`.padEnd(16));
                } else {
                    row.push("".padEnd(16));
                }
            }
            console.log(row.join(" | "));
        });
    }
}

function printClassTimetable(timetable, label) {
    console.log(`\n${label} Timetable:`);
    for (const key in timetable) {
        console.log(`\n${label} ${key}`);
        console.log("Days    | Period 1       | Period 2       | Period 3       | Period 4       | Period 5       | Period 6       | Period 7       | Period 8       | Period 9       | Period 10      ");
        console.log("--------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------|----------------");

        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach(day => {
            const row = [day];
            for (let period = 1; period <= 10; period++) {
                if (timetable[key][day] && timetable[key][day][period]) {
                    const { courseCode, roomName } = timetable[key][day][period];
                    row.push(`${courseCode} (${roomName})`.padEnd(16));
                } else {
                    row.push("".padEnd(16));
                }
            }
            console.log(row.join(" | "));
        });
    }
}

printRoomTimetable(timetableByRoom, "Room");
printClassTimetable(timetableByYearGroupAndProgram, "Class");


