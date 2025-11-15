import React from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-green-700">{vehicle.name}</h2>
      <p>Loại: {vehicle.type}</p>
      <p>Dung lượng pin: {vehicle.battery}%</p>
      <p>Giá thuê: {vehicle.price} VNĐ/giờ</p>
      <button
        onClick={() => navigate(`/vehicle/${vehicle.id}`)}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Xem chi tiết
      </button>
    </div>
  );
};

export default VehicleCard;
