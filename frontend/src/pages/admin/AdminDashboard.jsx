import React from 'react';

const stats = [
  { label: 'Tổng số xe', value: 120, icon: '🚗', color: 'bg-green-100' },
  { label: 'Khách hàng đã đăng ký', value: 85, icon: '👤', color: 'bg-blue-100' },
  { label: 'Nhân viên điểm thuê', value: 12, icon: '🧑‍🔧', color: 'bg-yellow-100' },
  { label: 'Lượt thuê hôm nay', value: 34, icon: '📈', color: 'bg-purple-100' },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Dashboard quản trị hệ thống</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded shadow ${stat.color}`}>
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-lg font-semibold">{stat.label}</p>
            <p className="text-2xl font-bold text-green-700">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
