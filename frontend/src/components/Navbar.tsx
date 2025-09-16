import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Home</Link> |{' '}
      {userName && userId ? (
        <>
          <Link to={`/profile/${userId}`}>Perfil</Link> |{' '}
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Registrar</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;