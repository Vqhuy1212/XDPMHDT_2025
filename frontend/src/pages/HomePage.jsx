import React from 'react';
import { Link } from 'react-router-dom';

const vehicles = [
  { id: 1, name: 'Xe điện Model X', price: '500.000đ/ngày' },
  { id: 2, name: 'Xe SUV Model Y', price: '700.000đ/ngày' },
  { id: 3, name: 'Xe hatchback Model Z', price: '400.000đ/ngày' },
];

function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Huy’s Car Rental</h1>
      <h2>Danh sách xe nổi bật</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{vehicle.name}</h3>
            <p>{vehicle.price}</p>
            <Link to={`/vehicle/${vehicle.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
