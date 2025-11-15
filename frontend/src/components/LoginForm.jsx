import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng nhập với:', formData);
    // Huy có thể gọi API ở đây
    navigate('/rent'); // Giả sử sau khi đăng nhập sẽ chuyển sang trang đặt xe
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Đăng nhập
      </button>
      <p className="text-sm text-center mt-2">
        Chưa có tài khoản? <a href="/register" className="text-green-600 underline">Đăng ký ngay</a>
      </p>
    </form>
  );
};

export default LoginForm;
