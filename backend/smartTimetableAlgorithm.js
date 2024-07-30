const scheduledTimetable = [
    {
        "_id": "66a8f14c65b9194bcdb4c747",
        "courseCode": "CSM111",
        "courseName": "Intro To Computers",
        "roomName": "FF3",
        "day": "Monday",
        "period": "1",
        "yearGroup": "Year 1",
        "program": "Computer Science",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c748",
        "courseCode": "CSM111",
        "courseName": "Intro To Computers",
        "roomName": "FF3",
        "day": "Monday",
        "period": "2",
        "yearGroup": "Year 1",
        "program": "Computer Science",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c749",
        "courseCode": "MTH101",
        "courseName": "Mathematics I",
        "roomName": "FF3",
        "day": "Monday",
        "period": "3",
        "yearGroup": "Year 1",
        "program": "Statistics",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c74a",
        "courseCode": "MTH101",
        "courseName": "Mathematics I",
        "roomName": "FF3",
        "day": "Monday",
        "period": "4",
        "yearGroup": "Year 1",
        "program": "Statistics",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c74b",
        "courseCode": "MTH101",
        "courseName": "Mathematics I",
        "roomName": "FF3",
        "day": "Monday",
        "period": "5",
        "yearGroup": "Year 1",
        "program": "Statistics",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c74c",
        "courseCode": "PHY121",
        "courseName": "Intro To Hardware",
        "roomName": "FF3",
        "day": "Monday",
        "period": "6",
        "yearGroup": "Year 2",
        "program": "Physics",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c74d",
        "courseCode": "MTH101",
        "courseName": "Mathematics I",
        "roomName": "FF3",
        "day": "Monday",
        "period": "7",
        "yearGroup": "Year 1",
        "program": "Computer Science",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c74e",
        "courseCode": "MTH101",
        "courseName": "Mathematics I",
        "roomName": "FF3",
        "day": "Monday",
        "period": "8",
        "yearGroup": "Year 1",
        "program": "Computer Science",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    },
    {
        "_id": "66a8f14c65b9194bcdb4c74f",
        "courseCode": "MTH101",
        "courseName": "Mathematics I",
        "roomName": "FF3",
        "day": "Monday",
        "period": "9",
        "yearGroup": "Year 1",
        "program": "Computer Science",
        "scheduled": false,
        "code": "2024A",
        "__v": 0
    }
];
console.log(scheduledTimetable);

const timetableByRoom = scheduledTimetable.reduce((acc, curr) => {
    if (!acc[curr.roomName]) {
        acc[curr.roomName] = {};
    }
    if (!acc[curr.roomName][curr.day]) {
        acc[curr.roomName][curr.day] = {};
    }
    acc[curr.roomName][curr.day][curr.period] = curr;
    return acc;
}, {});

const timetableByYearGroupAndProgram = scheduledTimetable.reduce((acc, curr) => {
    const key = `${curr.program} ${curr.yearGroup}`;
    if (!acc[key]) {
        acc[key] = {};
    }
    if (!acc[key][curr.day]) {
        acc[key][curr.day] = {};
    }
    acc[key][curr.day][curr.period] = curr;
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
                    const { courseCode, program, yearGroup } = timetable[key][day][period];
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
