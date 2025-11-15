import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './Layouts/MainLayout';

// Trang chính
import HomePage from './pages/HomePage';

// Người thuê
import LoginPage from './pages/renter/LoginPage';
import RentPage from './pages/renter/RentPage';
import VehicleDetailPage from './pages/renter/VehicleDetailPage';
import HistoryPage from './pages/renter/HistoryPage';

// Nhân viên điểm thuê
import DashboardPage from './pages/staff/DashboardPage';
import VerifyPage from './pages/staff/VerifyPage';
import PaymentPage from './pages/staff/PaymentPage';
import ManagePage from './pages/staff/ManagePage';

// Quản trị viên
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CustomerManagePage from './pages/admin/CustomerManagePage';
import StaffManagePage from './pages/admin/StaffManagePage';
import ReportPage from './pages/admin/ReportPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/staff/dashboard" element={<DashboardPage />} />
          <Route path="/staff/verify" element={<VerifyPage />} />
          <Route path="/staff/payment" element={<PaymentPage />} />
          <Route path="/staff/manage" element={<ManagePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<CustomerManagePage />} />
          <Route path="/admin/staff" element={<StaffManagePage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
