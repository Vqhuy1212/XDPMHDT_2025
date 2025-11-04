import React, { useState } from 'react';

const sampleRequests = [
  {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'vana@example.com',
    license: 'GPLX_A123456.jpg',
    idCard: 'CCCD_123456789.pdf',
    status: 'Chờ xác thực',
  },
  {
    id: 2,
    fullName: 'Trần Thị B',
    email: 'thib@example.com',
    license: 'GPLX_B987654.jpg',
    idCard: 'CCCD_987654321.pdf',
    status: 'Đã xác thực',
  },
];

const VerifyPage = () => {
  const [requests, setRequests] = useState(sampleRequests);

  const handleVerify = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: 'Đã xác thực' } : req
    );
    setRequests(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Xác thực khách hàng</h1>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Họ tên</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">GPLX</th>
              <th className="px-4 py-2 text-left">CMND/CCCD</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b">
                <td className="px-4 py-2">{req.fullName}</td>
                <td className="px-4 py-2">{req.email}</td>
                <td className="px-4 py-2">
                  <a href="#" className="text-blue-600 underline">{req.license}</a>
                </td>
                <td className="px-4 py-2">
                  <a href="#" className="text-blue-600 underline">{req.idCard}</a>
                </td>
                <td className="px-4 py-2">{req.status}</td>
                <td className="px-4 py-2">
                  {req.status === 'Chờ xác thực' ? (
                    <button
                      onClick={() => handleVerify(req.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Xác thực
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">Đã xác thực</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifyPage;
