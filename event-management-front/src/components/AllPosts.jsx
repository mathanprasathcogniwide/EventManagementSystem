// AllPosts.jsx
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, Grid, InputAdornment, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the token from local storage
        const token = localStorage.getItem('token');

        // Set the token in the request headers
        const headers = { Authorization: `Bearer ${token}` };

        // Make a GET request with the token
        const response = await axios.get(`http://localhost:8081/eventPosts${query ? `/keyword/${query}` : ''}`, { headers });

        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [query]);

  // AllPosts.jsx
  const handleEdit = (id) => {
    navigate("/edit",{state:{id}});
  }


  const handleDelete = async (eventTitle) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(`http://localhost:8081/eventPost/${eventTitle}`, { headers });
      setPosts(posts.filter((post) => post.eventTitle !== eventTitle));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleRegistration = (eventTitle) => {
    navigate('/registration', { state: { eventTitle } });
  };

  const isRegistered = (eventTitle) => {
    return posts.some((post) => post.eventTitle === eventTitle && post.registered);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ margin: '2%' }}>
        <Grid item xs={12} md={12} lg={12}>
          <Box>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search..."
              sx={{ width: '75%', padding: '2% auto' }}
              fullWidth
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </Grid>
        {posts && posts.map((post) => (
          <Grid key={post.eventTitle} item xs={12} md={6} lg={4}>
            <Card sx={{ padding: '3%', overflow: 'hidden', width: '84%', backgroundColor: '#ADD8E6' }}>
              <Typography variant="h5" sx={{ fontSize: '2rem', fontWeight: '600', fontFamily: 'sans-serif' }}>
                {post.eventTitle}
              </Typography>
              <Typography sx={{ color: '#585858', marginTop: '2%', fontFamily: 'cursive' }} variant="body">
                Event Title: {post.eventTitle}
              </Typography>
              <Typography varient="h5">Event Description: {post.eventDesc}</Typography>
              <Typography variant="h6">Event Date: {post.eventDate}</Typography>
              <Typography sx={{ fontFamily: 'serif', fontSize: '400' }} gutterBottom variant="body">
                Locations :{''}
              </Typography>
              {post.eventLocation.map((location, index) => (
                <Typography variant="body" gutterBottom key={index}>
                  {location}
                </Typography>
              ))}
              <Button 
                variant="contained" 
                onClick={() => handleRegistration(post.eventTitle)}
                disabled={isRegistered(post.eventTitle)}
              >
                {isRegistered(post.eventTitle) ? 'Registered' : 'Register'}
              </Button>
              <DeleteIcon onClick={() => handleDelete(post.eventTitle)} />
              <EditIcon onClick={() => handleEdit(post.eventTitle)} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllPosts;
