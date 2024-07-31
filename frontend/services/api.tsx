import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://192.168.56.1:5000/api';

// Define types for the timetable data
interface TimetablePeriod {
  time: string;
  subject: string;
}

interface TimetableDay {
  day: string;
  periods: TimetablePeriod[];
}

interface Timetable {
  times: string[];
  days: TimetableDay[];
}

// Fetch the timetable data from the API
export const fetchTimetable = async (): Promise<Timetable> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedule/2024A`);
    return response.data;
  } catch (error) {
    console.error('Error fetching timetable:', error);
  }
};

