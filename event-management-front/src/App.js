import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllPosts from './components/AllPosts';
import Create from './components/Create';
import Edit from './components/Edit';
import Registration from './components/Registration';
import Login from './components/Login';
import Register from './components/Register';
import AdminEvents from './components/AdminEvents';
import AdminUsers from './components/AdminUsers'; 
import AdminDashboard from './components/AdminDashboard'; 

function App() {

  
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="events" element={<AdminEvents />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
