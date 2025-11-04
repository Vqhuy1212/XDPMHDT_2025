import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-green-600 font-bold text-xl">GreenBike</Link>
          <nav className="space-x-4 text-sm">
            <Link to="/rent" className="text-gray-700 hover:text-green-600">Đặt xe</Link>
            <Link to="/history" className="text-gray-700 hover:text-green-600">Lịch sử</Link>
            <Link to="/staff/dashboard" className="text-gray-700 hover:text-green-600">Nhân viên</Link>
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-green-600">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500 text-center">
          © 2025 GreenBike. Di chuyển xanh cho tương lai.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
