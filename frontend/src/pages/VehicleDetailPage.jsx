import React from 'react';
import { useParams } from 'react-router-dom';
import { vehicles } from '../data/vehicles';

function VehicleDetailPage() {
  const { id } = useParams(); // lấy id từ URL
  const vehicle = vehicles.find(v => v.id === parseInt(id));

  if (!vehicle) {
    return <p>Xe không tồn tại.</p>;
  }

  const handleRent = () => {
    alert(`Bạn đã thuê: ${vehicle.name} - ${vehicle.price}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{vehicle.name}</h1>
      <img 
        src={vehicle.image} 
        alt={vehicle.name} 
        style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px' }}
      />
      <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Giá:</strong> {vehicle.price}</p>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>{vehicle.description}</p>
      <button 
        onClick={handleRent}
        style={{
          backgroundColor: '#2E8B57',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
      >
        Thuê xe
      </button>
    </div>
  );
}

export default VehicleDetailPage;
