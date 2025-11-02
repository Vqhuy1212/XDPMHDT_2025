import React from 'react';
import { Link } from 'react-router-dom';
import { vehicles } from '../data/vehicles';

function HomePage() {
  const handleRent = (vehicle) => {
    alert(`Bạn đã thuê: ${vehicle.name} - ${vehicle.price}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Huy’s Car Rental</h1>
      <h2>Xe nổi bật</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {vehicles.map(vehicle => (
          <div 
            key={vehicle.id} 
            style={{ 
              border: '1px solid #ccc', 
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              padding: '10px', 
              width: '200px',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h3>{vehicle.name}</h3>
            <p>{vehicle.price}</p>
            <button 
              onClick={() => handleRent(vehicle)}
              style={{
                backgroundColor: '#2E8B57',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
                marginBottom: '5px'
              }}
            >
              Thuê xe
            </button>
            <Link to={`/vehicle/${vehicle.id}`} style={{ display: 'block', marginTop: '5px', color: '#2E8B57' }}>
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
