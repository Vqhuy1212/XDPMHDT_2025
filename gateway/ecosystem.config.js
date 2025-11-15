module.exports = {
  apps: [
    {
      name: 'gateway',
      script: 'server.js', // File entry point của Gateway
      instances: 'max', // Số instance chạy song song
      exec_mode: 'cluster', // Chạy PM2 với chế độ cluster
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
