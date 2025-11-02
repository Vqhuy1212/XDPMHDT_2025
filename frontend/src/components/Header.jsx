import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      backgroundColor: '#2E8B57', 
      color: 'white' 
    }}>
      <h2 style={{ margin: 0 }}>Huy’s Car Rental</h2>
      <nav>
        <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/rent" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Thuê xe</Link>
        <Link to="/login" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Đăng nhập</Link>
      </nav>
    </header>
  );
}

export default Header;
