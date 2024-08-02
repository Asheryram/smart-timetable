import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import axios from '../services/axios';
import {toast,Toaster} from "react-hot-toast"

const Schedule = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [ploading, setPLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`/schedule/2024A`);
      console.log('Response:', response.data);

      if(response.data.message === "success"){
        toast.success("Time table Scheduled")
      }
    
    } catch (err) {
      console.error('An error occurred while sending data',error);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };
  const handlePSubmit = async () => {
    setPLoading(true);
    setError('');

    try {
      const response = await axios.post(`/populate`);
      console.log('Response:', response.data);

      if(response.data.status === "success"){
        toast.success("Database populated")
      }
    
    } catch (err) {
      console.error('An error occurred while sending data',error);
    } finally {
      setPLoading(false);
      setInputValue('');
    }
  };

  return (
    <Container>
 <Typography variant="h5" gutterBottom>
         Please click to fill the database with test data
        </Typography>
<Button
          variant="contained"
          color="primary"
          onClick={handlePSubmit}
          disabled={ploading}
        >
          {ploading ? 'Populating...' : 'Populate Database'}
        </Button>


      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
      >
        <Typography variant="h5" gutterBottom>
         Please click to initiate automatic scheduling
        </Typography>
       
       
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
      <Toaster/>
    </Container>
  );
};

export default Schedule;
