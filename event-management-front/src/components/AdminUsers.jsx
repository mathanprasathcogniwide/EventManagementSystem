// AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://localhost:8081/admin/users', { headers });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h4">Admin Users</Typography>
      {/* Render users list */}
      {users.map(user => (
        <div key={user.id}>
          <Typography>{user.username}</Typography>
          {/* Display user details */}
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
