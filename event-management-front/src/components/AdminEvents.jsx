// AdminEvents.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ eventTitle: '', eventDesc: '', eventDate: '', eventLocation: [] });

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get('http://localhost:8081/eventPosts', { headers });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get('http://localhost:8081/registrations', { headers });
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleAddEvent = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post('http://localhost:8081/eventPost', formData, { headers });
      fetchEvents();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApproveRegistration = async (registrationId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`http://localhost:8081/approveRegistration/${registrationId}`, {}, { headers });
      fetchRegistrations();
    } catch (error) {
      console.error('Error approving registration:', error);
    }
  };

  const handleDeleteRegistration = async (registrationId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8081/registration/${registrationId}`, { headers });
      fetchRegistrations();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Admin Events</Typography>
      <Button variant="contained" color="primary" onClick={handleAddEvent}>Add Event</Button>
      <Box mt={2}>
        {/* Render events list */}
        {events.map(event => (
          <div key={event.eventTitle}>
            <Typography variant="h6">{event.eventTitle}</Typography>
            <Typography>{event.eventDesc}</Typography>
            {/* Add edit/delete buttons */}
          </div>
        ))}
      </Box>
      <Typography variant="h4">Registrations</Typography>
      <Box mt={2}>
        {/* Render registration list */}
        {registrations.map(registration => (
          <div key={registration.id}>
            <Typography>{registration.name}</Typography>
            <Typography>{registration.phoneNumber}</Typography>
            <Typography>{registration.eventName}</Typography>
            <Button onClick={() => handleApproveRegistration(registration.id)}>Approve</Button>
            <Button onClick={() => handleDeleteRegistration(registration.id)}>Delete</Button>
          </div>
        ))}
      </Box>
      {/* Add dialog for adding new event */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="eventTitle"
            name="eventTitle"
            label="Event Title"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="eventDesc"
            name="eventDesc"
            label="Event Description"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="eventDate"
            name="eventDate"
            label="Event Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          {/* Add location input fields */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
