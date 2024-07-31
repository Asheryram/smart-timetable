import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import axios from 'axios';

const Overview = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [chartData, setChartData] = useState([
    { name: 'Optimal Scheduled Courses', value: 50 },
    { name: 'Less Optimal Schedules', value: 19 }
  ]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/overview');
        const { numberOfStudents, optimalCourses, lessOptimalCourses } = response.data;

        setStudentsCount(numberOfStudents);
        setChartData([
          { name: 'Optimal Scheduled Courses', value: optimalCourses },
          { name: 'Less Optimal Schedules', value: lessOptimalCourses }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="space-around" my={4}>
        
        <Paper elevation={3} sx={{ p: 2, width: '45%', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Optimality Chart
          </Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={[
                { name: 'Optimal Scheduled Courses', value: 50 },
                { name: 'Less Optimal Schedules', value: 19 }
              ]}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              <Cell key="value" fill="#82ca9d" />
              <Cell key="value" fill="#ff6f61" />
            </Pie>
            <Tooltip />
          </PieChart>
        </Paper>
      </Box>
    </Container>
  );
};

export default Overview;
