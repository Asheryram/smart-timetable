
const TimetableRow = ({ timetable })=> {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    return (
        <table>
            <thead>
                <tr>
                    <th>Days</th>
                    {Array.from({ length: 10 }, (_, i) => <th key={i}>Period {i + 1}</th>)}
                </tr>
            </thead>
            <tbody>
                {days.map(day => (
                    <tr key={day}>
                        <td>{day}</td>
                        {Array.from({ length: 10 }, (_, period) => (
                            <td key={period}>
                                {timetable[day] && timetable[day][period + 1] ? 
                                    `${timetable[day][period + 1].courseCode} (${timetable[day][period + 1].roomName})` : 
                                    ""}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TimetableRow;
