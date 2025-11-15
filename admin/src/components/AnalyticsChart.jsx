import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các module của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function AnalyticsChart({ data, type = 'line' }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Dữ liệu thống kê',
      },
    },
  };

  return (
    <div className="chart">
      {type === 'line' ? <Line data={data} options={options} /> : <Bar data={data} options={options} />}
    </div>
  );
}
