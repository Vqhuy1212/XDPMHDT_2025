import React from 'react';
import RentalHistoryTable from '../../components/RentalHistoryTable';

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Lịch sử thuê xe</h1>
      <RentalHistoryTable />
    </div>
  );
};

export default HistoryPage;
