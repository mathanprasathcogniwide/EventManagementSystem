// AdminDashboard.jsx
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import AdminEvents from './AdminEvents';
import AdminUsers from './AdminUsers';


const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="events" element={<AdminEvents />} />
      <Route path="users" element={<AdminUsers />} />
    </Routes>
  
  );
};

export default AdminDashboard;
