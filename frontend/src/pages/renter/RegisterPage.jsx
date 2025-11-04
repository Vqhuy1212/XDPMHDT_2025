import React from 'react';
import AuthForm from '../../components/AuthForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Đăng ký tài khoản</h2>
        <AuthForm />
      </div>
    </div>
  );
};

export default RegisterPage;
