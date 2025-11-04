import React, { useState } from 'react';

const initialCustomers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'vana@example.com', status: 'Hoạt động' },
  { id: 2, name: 'Trần Thị B', email: 'thib@example.com', status: 'Đã khoá' },
];

const CustomerManagePage = () => {
  const [customers, setCustomers] = useState(initialCustomers);

  const handleToggleStatus = (id) => {
    const updated = customers.map((c) =>
      c.id === id
        ? {
            ...c,
            status: c.status === 'Hoạt động' ? 'Đã khoá' : 'Hoạt động',
          }
        : c
    );
    setCustomers(updated);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Quản lý khách hàng</h1>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Họ tên</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleToggleStatus(c.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    {c.status === 'Hoạt động' ? 'Khoá' : 'Mở khoá'}
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xoá
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

export default CustomerManagePage;
