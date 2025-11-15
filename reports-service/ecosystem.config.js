module.exports = {
  apps: [
    {
      name: 'reports-service',
      script: 'server.js', // File entry point của Reports Service
      instances: 1, // 1 instance
      env: {
        PORT: 6000,
        NODE_ENV: 'production',
      },
    },
  ],
};
