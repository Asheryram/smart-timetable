import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import axios from '../services/axios';

const Schedule = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
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
      setError('An error occurred while sending data');
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  return (
    <Container>
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
        {/* <TextField
          label="Enter Schedule"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        /> */}
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
    </Container>
  );
};

export default Schedule;
