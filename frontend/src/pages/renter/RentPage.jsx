import React from 'react';
import StationMap from '../../components/StationMap';
import VehicleCard from '../../components/VehicleCard';
import vehicles from '../../data/vehicles';

const RentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt xe điện</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <StationMap />
        </div>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentPage;
