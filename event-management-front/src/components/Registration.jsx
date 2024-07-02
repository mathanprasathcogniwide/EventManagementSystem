import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phoneNumber: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        name: form.name,
        phoneNumber: form.phoneNumber,
        eventTitle: location.state.eventTitle
      };

      // Fetch the token from local storage
      const token = localStorage.getItem('token');

      // Set the token in the request headers
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post('http://localhost:8081/registration', formData, { headers });
      console.log(response.data);
      
      // Clear form and navigate back to home page
      alert('Registration successful!');
      setForm({ name: '', phoneNumber: '' });
      navigate('/posts', { replace: true });
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
  
    // Apply validation only to the phone number field
    if (name === 'phoneNumber') {
      // Remove any non-numeric characters
      processedValue = processedValue.replace(/\D/g, '');
      // Limit to 10 characters
      processedValue = processedValue.slice(0, 10);
    }
  
    setForm({ ...form, [name]: processedValue });
  };
  
  
  
  

  return (
    <Paper sx={{ padding: '1%' }} elevation={0}>
      <Typography sx={{ margin: '3% auto' }} align="center" variant="h5">
        Register for {location.state.eventTitle}
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
            type="string"
            sx={{ width: '50%', margin: '2% auto' }}
            required
            onChange={handleChange}
            name="name"
            label="Your Name"
            variant="outlined"
            value={form.name}
          />
          
          <TextField
            type="tel"
            sx={{ width: '50%', margin: '2% auto' }}
            required
            onChange={handleChange}
            name="phoneNumber"
            maxLength={10}
            label="Phone Number"
            variant="outlined"
            value={form.phoneNumber}
            error={Boolean(error)}
            helperText={error}
          />
          <Button
            sx={{ width: '50%', margin: '2% auto' }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Registration;
