import React from 'react';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Đăng nhập</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
