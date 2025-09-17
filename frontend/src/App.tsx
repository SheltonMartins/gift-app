import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FriendProfile from './pages/FriendProfile';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = 'SEU_CLIENT_ID_DO_GOOGLE';
const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/friend/:id" element={<FriendProfile />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;


