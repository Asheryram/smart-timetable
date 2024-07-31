import React, { useState } from 'react';
import { Button, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import Schedule from "../components/Schedule"
import Overview from "../components/Overview"
import Programs from "../components/Programs"
import Rooms from "../components/Rooms"

// Components for different sections of the dashboard
// const Index = () => (
//   <Container>
//     <Typography variant="h4">Schedules</Typography>
//   </Container>
// );

// const Programs = () => (
//   <Container>
//     <Typography variant="h4">Programs</Typography>
//   </Container>
// );

// const Overview = () => (
//   <Container>
//     <Typography variant="h4">Overview</Typography>
//   </Container>
// );

// const Rooms = () => (
//   <Container>
//     <Typography variant="h4">Rooms</Typography>
//   </Container>
// );

const Auth = () => {
  const [activeComponent, setActiveComponent] = useState('index');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'programs':
        return <Programs />;
      case 'overview':
        return <Overview />;
      case 'rooms':
        return <Rooms />;
      default:
        return <Schedule />;
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Smart TT</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box display="flex" justifyContent="center" my={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveComponent('schedule')}
            sx={{ mx: 1 }}
          >
           Schedule
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveComponent('overview')}
            sx={{ mx: 1 }}
          >
            Overview
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveComponent('programs')}
            sx={{ mx: 1 }}
          >
            Programs
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveComponent('rooms')}
            sx={{ mx: 1 }}
          >
           Rooms
          </Button>
        </Box>
        {renderComponent()}
      </Container>
    </div>
  );
};

export default Auth;
