// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hamburger, Nav, NavLinks } from '../styles/Navbar.Styles';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Nav>
      <Link to="/" style={{ color: '#fff', fontWeight: '600', fontSize: '18px' }}>GiftApp</Link>

      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        ☰
      </Hamburger>

      <NavLinks isOpen={isOpen}>
        {userName && userId ? (
          <>
            <Link to={`/profile/${userId}`}>Perfil</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
