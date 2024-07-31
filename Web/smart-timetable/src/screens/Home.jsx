import React, { useState } from 'react';
import { Container, Button, Typography, Modal, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Programs from '../components/Programs';
import Rooms from '../components/Rooms';
import RoomAvailability from '../components/RoomAvailability'; 
import Login from './Login'; 

const Home = () => {
  const [view, setView] = useState('roomAvailability');
  const [openLogin, setOpenLogin] = useState(false);

  const handleViewChange = (viewName) => {
    setView(viewName);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
           Smart Timetable
          </Typography>
          <Button color="inherit" onClick={() => handleViewChange('programs')}>Programs</Button>
          <Button color="inherit" onClick={() => handleViewChange('rooms')}>Rooms</Button>
          <Button color="inherit" onClick={() => handleViewChange('roomAvailability')}>Room Availability</Button>
          <Button color="inherit" onClick={handleOpenLogin}>Login</Button>
        </Toolbar>
      </AppBar>
      
      <div style={{ padding: '20px' }}>
        {view === 'home' && <Typography variant="h4">Welcome to the Home Page</Typography>}
        {view === 'programs' && <Programs />}
        {view === 'rooms' && <Rooms />}
        {view === 'roomAvailability' && <RoomAvailability />} 
      </div>

      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.3)' 
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxWidth: '400px',
            width: '100%',
            outline: 'none'
          }}>
            <Login />
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default Home;
