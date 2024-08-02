import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import axios from "../services/axios"
import NoDataAvailable from './NoDataAvailable'

const Overview = () => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/schedule/2024A');
        const timetableData = response?.data;

        let optimalCourses = 0;
        let lessOptimalCourses = 0;

        if(timetableData){
        timetableData?.map(course => {
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
      }else{
        setChartData([])
      }

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
{
  chartData.length === 0 || (chartData[0].value === 0 && chartData[1].value === 0)  ? <NoDataAvailable/> : ""
}

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
