import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = { eventTitle: "", eventDesc: "", eventDate: "", eventLocation: [] };

const Create = () => {
  const locations = [
    { name: "Chennai" },
    { name: "Madurai" },
    { name: "Trichy" },
    { name: "Coimbatore" },
    { name: "Salem" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [dateError, setDateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(form.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    if (selectedDate < today) {
      setDateError("The event date must be today or in the future.");
      return;
    }

    setDateError(""); // Clear previous errors if any
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post("http://localhost:8081/eventPost", form, { headers })
      .then((resp) => {
        console.log(resp.data);
        setForm(initial); // Reset form
        navigate('/posts');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { eventTitle, eventDesc, eventDate, eventLocation } = form;

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      const newLocations = checked
        ? [...prevForm.eventLocation, value]
        : prevForm.eventLocation.filter((location) => location !== value);
      return { ...prevForm, eventLocation: newLocations };
    });
  };

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Event
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, eventTitle: e.target.value })}
            label="Enter your Event Title"
            variant="outlined"
            value={eventTitle}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, eventDesc: e.target.value })}
            label="Event Description"
            variant="outlined"
            value={eventDesc}
          />

          <TextField
            type="date"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            label="Event Date"
            variant="outlined"
            value={eventDate}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {dateError && (
            <Alert severity="error" sx={{ width: "50%", margin: "2% auto" }}>
              {dateError}
            </Alert>
          )}

          <Box sx={{ margin: "1% auto" }}>
            <Typography variant="h6">Please mention the Location</Typography>
            <ul>
              {locations.map(({ name }, index) => (
                <li key={index}>
                  <div>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      onChange={handleChange}
                      checked={eventLocation.includes(name)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </li>
              ))}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
