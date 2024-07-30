
const  NonOptimalCourses =()=> {
    const courses = [];

    return (
        <div>
            <h2>Non-Optimal Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseCode}>{course.courseName}</li>
                ))}
            </ul>
        </div>
    );
}

export default NonOptimalCourses;
