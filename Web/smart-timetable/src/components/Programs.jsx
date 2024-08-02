import React, { useRef, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from '../services/axios';
import NoDataAvailable from './NoDataAvailable'
import Loading from './Loading'

const Programs = () => {
  const [scheduledTimetable, setScheduledTimeTable] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchTimeTable = async () => {
      setLoading(true)
      try {
        const res = await axios.get("/schedule/2024A");
        console.log(res);
        if (Array.isArray(res.data)) {
          setLoading(false)
          setScheduledTimeTable(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
          setLoading(false)

          setScheduledTimeTable([]);

        }
      } catch (error) {
        setLoading(false)
        console.error("Error fetching room availability:", error);
        setScheduledTimeTable([]);
      }
    };

    fetchTimeTable();
  }, []);

  let timetableByYearGroupAndProgram = {};
  if (Array.isArray(scheduledTimetable)) {
    timetableByYearGroupAndProgram = scheduledTimetable.reduce((acc, curr) => {
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
  }

  const tableRef = useRef(null);

  const generatePDF = async () => {
    const doc = new jsPDF();

    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL('image/png');

      doc.addImage(imgData, 'PNG', 10, 10);
      doc.save('class-timetable.pdf');
    }
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={generatePDF}>Generate PDF</Button>

{
  loading ?  <Loading/> :  


  <div>
{
        scheduledTimetable.length === 0 ? <NoDataAvailable/> : ""
      }
      <TableContainer ref={tableRef}>
        {Object.entries(timetableByYearGroupAndProgram).map(([program, days]) => (
          <Table className="my-3 bg-white" key={program}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={10}><strong>{program}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Period 1</TableCell>
                <TableCell>Period 2</TableCell>
                <TableCell>Period 3</TableCell>
                <TableCell>Period 4</TableCell>
                <TableCell>Period 5</TableCell>
                <TableCell>Period 6</TableCell>
                <TableCell>Period 7</TableCell>
                <TableCell>Period 8</TableCell>
                <TableCell>Period 9</TableCell>
                <TableCell>Period 10</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <TableRow key={day}>
                  <TableCell>{day}</TableCell>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(period => (
                    <TableCell key={period}>
                      {days[day] && days[day][period] ? `${days[day][period].courseCode} (${days[day][period].roomName})` : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </TableContainer>

</div>
}



     
    </Container>
  );
};

export default Programs;
