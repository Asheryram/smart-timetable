import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Toaster,toast} from "react-hot-toast"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'Admin' && password === '1234') {
      toast.success("Success")
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } else {
      toast.error('Incorrect credentials');
    }
  };

  return (
    <div className="flex items-center justify-center bg-[url('/src/assets/Background.jpg')] p-0 w-[100%] h-[100vh] flex-col relative">
      <img className='absolute top-0' src='/src/assets/knust.png' alt="Logo" />
      <Typography variant="h4" color="textPrimary" gutterBottom>User Login</Typography>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <TextField
          label="username"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      <Toaster />
    </div>
  );
}

export default Login;
