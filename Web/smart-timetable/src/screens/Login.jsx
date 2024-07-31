import React from 'react';
import { TextField, Button, Typography } from '@mui/material';

function Login() {
  return (
    <div className="flex items-center justify-center bg-[url('/src/assets/Background.jpg')] p-0 w-[100%] h-[100vh] flex-col">
      <img className='absolute top-0' src='/src/assets/knust.png' alt="Logo"/>
      <Typography variant="h4" color="textPrimary" gutterBottom>User Login</Typography>

      <form className="flex flex-col ">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          className="h-10 rounded-md mt-4 text-white text-[20px] bg-green-800 cursor-pointer"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
