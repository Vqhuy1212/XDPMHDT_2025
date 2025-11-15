import React from 'react';

const historyData = [
  {
    id: 1,
    vehicle: 'VinFast Evo200',
    station: 'Trường ĐH GTVT TP.HCM',
    time: '2025-10-20 08:30',
    duration: '2 giờ',
    cost: '40,000 VNĐ',
  },
  {
    id: 2,
    vehicle: 'Yadea G5',
    station: 'Bến xe Miền Đông mới',
    time: '2025-10-18 14:00',
    duration: '1.5 giờ',
    cost: '27,000 VNĐ',
  },
];

const RentalHistoryTable = () => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Xe</th>
            <th className="px-4 py-2 text-left">Điểm thuê</th>
            <th className="px-4 py-2 text-left">Thời gian</th>
            <th className="px-4 py-2 text-left">Thời lượng</th>
            <th className="px-4 py-2 text-left">Chi phí</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.vehicle}</td>
              <td className="px-4 py-2">{item.station}</td>
              <td className="px-4 py-2">{item.time}</td>
              <td className="px-4 py-2">{item.duration}</td>
              <td className="px-4 py-2">{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalHistoryTable;
