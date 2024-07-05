import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/login', formData);
      // Assuming backend returns JWT token upon successful login
      const token = response.data;

      // You can store the token in localStorage or sessionStorage for later use
      localStorage.setItem('token', token);

      // Set token in Axios defaults for all subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Clear form fields
      setFormData({ username: '', password: '' });

      // Redirect to AllPosts component upon successful login
      navigate('/posts');
    } catch (error) {
      setError('Invalid username or password. Please try again.');
      console.error('Login failed:', error);
    }
  };

  const handleRegister = () => {
    // Redirect to the registration page
    navigate('/register');
  };

  return (
    <Paper sx={{ padding: '1%' }} elevation={0}>
      <Typography sx={{ margin: '3% auto' }} align="center" variant="h5">
        Login
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
            Login
          </Button>
          <Button
            sx={{ width: '50%', margin: '2% auto', marginTop: '1rem' }}
            variant="outlined"
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Login;
