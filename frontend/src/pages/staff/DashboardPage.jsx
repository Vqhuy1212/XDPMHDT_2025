import React from 'react';

const vehiclesAtStation = [
  { id: 1, name: 'VinFast Evo200', status: 'Sẵn sàng', battery: 90 },
  { id: 2, name: 'Yadea G5', status: 'Đang thuê', battery: 60 },
  { id: 3, name: 'DatBike Weaver', status: 'Đang sạc', battery: 30 },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Điểm thuê: Trạm Đại học GTVT</h1>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Danh sách xe tại trạm</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Tên xe</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Pin</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesAtStation.map((v) => (
              <tr key={v.id} className="border-b">
                <td className="px-4 py-2">{v.name}</td>
                <td className="px-4 py-2">{v.status}</td>
                <td className="px-4 py-2">{v.battery}%</td>
                <td className="px-4 py-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Giao xe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
