import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  eventTitle: "",
  eventDesc: "",
  eventDate:"",
  eventLocation: []
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.id);

  useEffect(() => {
    const fetchInitialPosts = async (id) => {  
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://localhost:8081/eventPost/${id}`, { headers });
        setForm(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInitialPosts(currId);
  }, [currId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put("http://localhost:8081/eventPost", form, { headers });
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const locationName = e.target.value;
    if (form.eventLocation.includes(locationName)) {
      // If location is already in the array, remove it
      setForm({ ...form, eventLocation: form.eventLocation.filter(location => location !== locationName) });
    } else {
      // If location is not in the array, add it
      setForm({ ...form, eventLocation: [...form.eventLocation, locationName] });
    }
  };
  
  const locations = [
    { name: "Chennai" },
    { name: "Madurai" },
    { name: "Trichy" },
    { name: "Coimbatore" },
    { name: "Salem" }
  ];

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit The Event
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
            value={form.eventTitle}
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
            value={form.eventDesc}
          />
          <TextField
            type="date"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({...form, eventDate: e.target.value})}
            label="Event Date"
            variant="outlined"
            value={form.eventDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please mention the Location</h3>
            <ul>
              {locations.map(({ name }, index) => (
                <li key={index}>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        onChange={handleChange}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
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

export default Edit;
