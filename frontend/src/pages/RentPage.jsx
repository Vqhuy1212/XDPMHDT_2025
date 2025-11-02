import React from 'react';

const vehicles = [
  { id: 1, name: 'Xe điện Model X', price: '500.000đ/ngày' },
  { id: 2, name: 'Xe SUV Model Y', price: '700.000đ/ngày' },
  { id: 3, name: 'Xe hatchback Model Z', price: '400.000đ/ngày' },
];

function RentPage() {
  const handleRent = (vehicle) => {
    alert(`Bạn đã thuê: ${vehicle.name} - ${vehicle.price}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang Thuê xe</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{vehicle.name}</h3>
            <p>{vehicle.price}</p>
            <button onClick={() => handleRent(vehicle)}>Thuê xe</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RentPage;
