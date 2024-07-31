import axios from "./axios";

export const fetchRoomAvailability = async () => {
    try {
      const response = await axios.get('/roomAvailability');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching room availability:', error);
      return [];
    }
  };