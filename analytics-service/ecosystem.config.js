module.exports = {
  apps: [
    {
      name: 'analytics-service',
      script: 'server.js', // File entry point của Analytics Service
      instances: 'max', // Số instance chạy song song
      exec_mode: 'cluster', // Chạy PM2 với chế độ cluster
      env: {
        PORT: 5002,
        NODE_ENV: 'production',
      },
    },
  ],
};
