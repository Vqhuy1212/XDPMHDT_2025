import React from 'react';
import { useParams } from 'react-router-dom';

const vehicles = [
  { id: 1, name: 'Xe điện Model X', price: '500.000đ/ngày', description: 'Xe điện tiện nghi, tiết kiệm năng lượng.' },
  { id: 2, name: 'Xe SUV Model Y', price: '700.000đ/ngày', description: 'SUV mạnh mẽ, rộng rãi.' },
  { id: 3, name: 'Xe hatchback Model Z', price: '400.000đ/ngày', description: 'Xe nhỏ gọn, dễ di chuyển.' },
];

function VehicleDetailPage() {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === parseInt(id));

  if (!vehicle) return <div>Xe không tồn tại</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{vehicle.name}</h1>
      <p>Giá: {vehicle.price}</p>
      <p>{vehicle.description}</p>
    </div>
  );
}

export default VehicleDetailPage;
