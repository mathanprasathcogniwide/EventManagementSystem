import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate password
  const validatePassword = (password) => {
    const errors = [];

    // Check if password length is at least 8 characters
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    }

    // Check if password contains at least one special character
    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character.');
    }

    // Check if password contains at least one numeric value
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one numeric value.');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors[0]); // Display the first error message
      return;
    }
    try {
      const response = await axios.post('http://localhost:8081/register', formData);
      // Assuming backend returns the registered user upon successful registration
      const registeredUser = response.data;
      console.log(registeredUser)

      // Display an alert message for successful registration
      window.alert('Registration successful');

      // Optionally, you can redirect the user to the login page after successful registration
      navigate('/login');
    } catch (error) {
      setError('User Already Exist');
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
            error={Boolean(passwordError)}
            helperText={passwordError}
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
