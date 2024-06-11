import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/register', formData);
      // Assuming backend returns the registered user upon successful registration
      const registeredUser = response.data;

      // Display an alert message for successful registration
      window.alert('Registration successful');

      // Optionally, you can redirect the user to the login page after successful registration
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error);
    }
  };

  return (
    <Paper sx={{ padding: '1%' }} elevation={0}>
      <Typography sx={{ margin: '3% auto' }} align="center" variant="h5">
        Register
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <TextField
            type="text"
            sx={{ width: '50%', margin: '2% auto' }}
            required
            onChange={handleChange}
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
          />
          <TextField
            type="password"
            sx={{ width: '50%', margin: '2% auto' }}
            required
            onChange={handleChange}
            name="password"
            label="Password"
            variant="outlined"
            value={formData.password}
          />
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button sx={{ width: '50%', margin: '2% auto' }} variant="contained" type="submit">
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Register;
