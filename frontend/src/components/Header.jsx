import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
      <h2>Huy’s Car Rental</h2>
      <nav>
        <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
        <Link to="/rent" style={{ margin: '0 10px', color: 'white' }}>Thuê xe</Link>
        <Link to="/login" style={{ margin: '0 10px', color: 'white' }}>Đăng nhập</Link>
      </nav>
    </header>
  );
}

export default Header;
