import React, { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from '../services/axios';

const generatePDF = async (ref) => {
  const doc = new jsPDF();
  const canvas = await html2canvas(ref.current);
  const imgData = canvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', 10, 10);
  doc.save('room-timetable.pdf');
};

const Rooms = () => {
  const [scheduledTimetable, setScheduledTimeTable] = useState([]);
  
  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const res = await axios.get("/schedule/2024A");
        console.log(res);
        if (Array.isArray(res.data)) {
          setScheduledTimeTable(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
          setScheduledTimeTable([]);
        }
      } catch (error) {
        console.error(error);
        setScheduledTimeTable([]);
      }
    };

    fetchTimeTable();
  }, []);

  let timetableByRoom = {};
  if (Array.isArray(scheduledTimetable)) {
    timetableByRoom = scheduledTimetable.reduce((acc, curr) => {
      if (!acc[curr.roomName]) {
        acc[curr.roomName] = {};
      }
      if (!acc[curr.roomName][curr.day]) {
        acc[curr.roomName][curr.day] = {};
      }
      acc[curr.roomName][curr.day][curr.period] = curr;
      return acc;
    }, {});
  }

  const tableRef = useRef(null);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => generatePDF(tableRef)}>Generate PDF</Button>
      <TableContainer ref={tableRef}>
        {Object.entries(timetableByRoom).map(([room, days]) => (
          <Table className="my-3 bg-white" key={room}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={12}><strong>{room}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day</TableCell>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(period => (
                  <TableCell key={period}>Period {period}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <TableRow key={day}>
                  <TableCell>{day}</TableCell>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(period => (
                    <TableCell key={period}>
                      {days[day] && days[day][period] ? `${days[day][period].courseCode} (${days[day][period].courseName})` : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </TableContainer>
    </Container>
  );
};

export default Rooms;
