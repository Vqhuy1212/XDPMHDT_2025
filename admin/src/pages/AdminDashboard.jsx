import React, { useEffect, useState } from 'react'; // Import React và các hook cần thiết
import axios from 'axios'; // Import axios để gọi API
import AnalyticsChart from '../components/AnalyticsChart'; // Import component hiển thị biểu đồ

const GATEWAY_URL = 'http://localhost:3000'; // URL của API Gateway (server sẽ forward yêu cầu)

export default function AdminDashboard() {
  // Khai báo các state để lưu dữ liệu
  const [kpis, setKpis] = useState(null); // KPIs (Key Performance Indicators) cho dashboard
  const [history, setHistory] = useState(null); // Dữ liệu lịch sử thuê xe
  const [forecast, setForecast] = useState(null); // Dự báo nhu cầu thuê xe
  const [hourly, setHourly] = useState([]); // Dữ liệu thuê xe theo giờ

  // useEffect hook: gọi các API ngay khi component được render
  useEffect(() => {
    fetchMetrics(); // Gọi API lấy thông tin KPI
    fetchHistory(); // Gọi API lấy lịch sử thuê xe
    fetchForecast(); // Gọi API dự báo nhu cầu
  }, []);

  // Gọi API lấy KPI (metrics) từ API Gateway
  async function fetchMetrics() {
    try {
      const response = await axios.get(`${GATEWAY_URL}/api/metrics`); // Gửi GET request tới Gateway
      setKpis(response.data); // Cập nhật state kpis với dữ liệu trả về
      setHourly(response.data.hourly_usage || []); // Cập nhật state hourly với dữ liệu giờ thuê xe
    } catch (error) {
      console.error('Error fetching metrics:', error); // In ra lỗi nếu có
    }
  }

  // Gọi API lấy dữ liệu lịch sử thuê xe
  async function fetchHistory() {
    try {
      const response = await axios.get(`${GATEWAY_URL}/api/history`); // Gửi GET request tới Gateway
      setHistory(response.data); // Cập nhật state history với dữ liệu trả về
    } catch (error) {
      console.error('Error fetching history:', error); // In ra lỗi nếu có
    }
  }

  // Gọi API dự báo nhu cầu thuê xe
  async function fetchForecast() {
    try {
      const response = await axios.get(`${GATEWAY_URL}/api/forecast?horizon=6`); // Gửi GET request tới Gateway với query parameter
      setForecast(response.data); // Cập nhật state forecast với dữ liệu trả về
    } catch (error) {
      console.error('Error fetching forecast:', error); // In ra lỗi nếu có
    }
  }

  // Hàm này dùng để xây dựng dữ liệu cho biểu đồ tuyến tính (line chart)
  const buildLineData = (labels, data) => ({
    labels, // Mảng các nhãn (tháng hoặc ngày)
    datasets: [
      {
        label: 'Lượt thuê', // Tiêu đề của dataset (tên dữ liệu biểu đồ)
        data, // Dữ liệu cho biểu đồ
        tension: 0.3, // Độ cong của đường line chart
      },
    ],
  });

  // Hàm này dùng để xây dựng dữ liệu cho biểu đồ thanh (bar chart)
  const buildHourlyData = (hourlyArr) => ({
    labels: hourlyArr.map((h) => h.hour), // Mảng giờ (0 đến 23)
    datasets: [
      {
        label: 'Lượt thuê/giờ', // Tiêu đề của dataset (tên dữ liệu biểu đồ)
        data: hourlyArr.map((h) => h.rentals), // Dữ liệu số lượng thuê xe theo giờ
      },
    ],
  });

  // Tải báo cáo dưới dạng PDF
  async function downloadPDF() {
    const payload = { type: 'summary', payload: { metrics: kpis, table: [] } }; // Dữ liệu cho báo cáo PDF
    const response = await axios.post(`${GATEWAY_URL}/api/report/pdf`, payload, { responseType: 'blob' }); // Gửi request POST để tải PDF
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' })); // Tạo URL cho PDF
    const a = document.createElement('a'); // Tạo thẻ a để tải file
    a.href = url;
    a.download = 'report.pdf'; // Đặt tên file PDF
    document.body.appendChild(a);
    a.click(); // Mô phỏng nhấp chuột để tải
    a.remove(); // Xóa thẻ a sau khi tải
  }

  // Tải báo cáo dưới dạng Excel
  async function downloadExcel() {
    const payload = { type: 'summary', payload: { metrics: kpis, table: [] } }; // Dữ liệu cho báo cáo Excel
    const response = await axios.post(`${GATEWAY_URL}/api/report/excel`, payload, { responseType: 'blob' }); // Gửi request POST để tải Excel
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })); // Tạo URL cho Excel
    const a = document.createElement('a'); // Tạo thẻ a để tải file
    a.href = url;
    a.download = 'report.xlsx'; // Đặt tên file Excel
    document.body.appendChild(a);
    a.click(); // Mô phỏng nhấp chuột để tải
    a.remove(); // Xóa thẻ a sau khi tải
  }

  return (
    <div>
      <h1 style={{ color: '#1177bb' }}>EV Station - Admin Dashboard</h1>

      {/* Hiển thị các chỉ số KPI */}
      <div className="kpis">
        <div className="kpi card">
          <div>Tổng số xe</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{kpis?.total_vehicles ?? '-'}</div>
        </div>
        <div className="kpi card">
          <div>Khách hàng đã đăng ký</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{kpis?.registered_customers ?? '-'}</div>
        </div>
        <div className="kpi card">
          <div>Nhân viên</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{kpis?.staff_count ?? '-'}</div>
        </div>
        <div className="kpi card">
          <div>Lượt thuê hôm nay</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{kpis?.today_rentals ?? '-'}</div>
        </div>
      </div>

      {/* Nút tải báo cáo PDF và Excel */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <button onClick={downloadPDF}>Tải PDF</button>
        <button onClick={downloadExcel}>Tải Excel</button>
      </div>

      {/* Biểu đồ dự báo nhu cầu thuê */}
      <div className="chartRow">
        <div className="chartBox card">
          {forecast ? (
            <AnalyticsChart
              data={buildLineData(forecast.months, forecast.predicted_rentals)}
              type="line"
              title="Dự báo lượt thuê (tháng)"
            />
          ) : (
            <div>Loading forecast...</div>
          )}
        </div>

        {/* Biểu đồ giờ cao điểm */}
        <div className="chartBox card">
          {hourly.length ? (
            <AnalyticsChart
              data={buildHourlyData(hourly)}
              type="bar"
              title="Giờ cao điểm (lượt thuê theo giờ)"
            />
          ) : (
            <div>Loading hourly...</div>
          )}
        </div>
      </div>
    </div>
  );
}
