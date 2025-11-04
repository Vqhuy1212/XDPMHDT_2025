import React, { useState } from 'react';

const AuthForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    license: null,
    idCard: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu đăng ký:', formData);   
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        placeholder="Họ và tên"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
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
      <label className="block text-sm font-medium">Upload giấy phép lái xe:</label>
      <input
        type="file"
        name="license"
        accept="image/*,.pdf"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <label className="block text-sm font-medium">Upload CMND/CCCD:</label>
      <input
        type="file"
        name="idCard"
        accept="image/*,.pdf"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default AuthForm;
