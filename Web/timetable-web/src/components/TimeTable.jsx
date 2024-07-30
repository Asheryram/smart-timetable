import TimetableRow from './TimeTableRow';

const Timetable = ()=> {
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

    return (
        <div>
            <h2>Timetable</h2>
            <div>
                <h3>By Room</h3>
                {Object.keys(timetableByRoom).map(room => (
                    <div key={room}>
                        <h4>Room: {room}</h4>
                        <TimetableRow timetable={timetableByRoom[room]} />
                    </div>
                ))}
            </div>
            <div>
                <h3>By Class</h3>
                {Object.keys(timetableByYearGroupAndProgram).map(classKey => (
                    <div key={classKey}>
                        <h4>Class: {classKey}</h4>
                        <TimetableRow timetable={timetableByYearGroupAndProgram[classKey]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Timetable;
