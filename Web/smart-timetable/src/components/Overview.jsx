import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import axios from "../services/axios"
const Overview = () => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/schedule/2024A');
        const timetableData = response?.data;

        let optimalCourses = 0;
        let lessOptimalCourses = 0;

        timetableData.forEach(course => {
          if (course.scheduled) {
            optimalCourses++;
          } else {
            lessOptimalCourses++;
          }
        });
        console.log([
          { name: 'Optimal Scheduled Courses', value: optimalCourses },
          { name: 'Less Optimal Schedules', value: lessOptimalCourses }
        ])
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
              data={chartData}
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
