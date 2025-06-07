import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Pages & Components
import Home from './components/Home';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import PaymentUse from './pages/payment/PaymentUse';
import Upload from './pages/upload/Upload';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login`;
  };

  const logout = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
  };

  if (loading) {
    // You can replace this with a spinner if you want
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<PaymentUse />} />
        <Route path="/upload" element={<Upload />} />

        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={login} />} />

        {/* Protected Profile Route */}
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} onLogout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all redirect to home or 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
