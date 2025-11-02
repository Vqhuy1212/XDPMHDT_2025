import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Đăng nhập với\nUsername: ${username}\nPassword: ${password}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={{ marginTop: '10px' }}>Đăng nhập</button>
      </form>
    </div>
  );
}

export default LoginPage;
