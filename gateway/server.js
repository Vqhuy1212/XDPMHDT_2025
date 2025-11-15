import express from 'express';
import cors from 'cors';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { swaggerSpec, swaggerUi } from './swagger.js'; // Import Swagger setup

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// Swagger Setup
// ========================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI route

// ========================
// ĐỊA CHỈ CÁC MICROSERVICE
// ========================
const ANALYTICS_URL = process.env.ANALYTICS_URL || 'http://localhost:5001';
const REPORTS_URL = process.env.REPORTS_URL || 'http://localhost:6000';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// ========================
// MIDDLEWARE XÁC THỰC JWT
// ========================
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Lưu thông tin user vào request để các route sau có thể dùng
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

// ========================
// AUTH - ĐĂNG NHẬP & ĐĂNG KÝ
// ========================

// Đăng ký người dùng
app.post('/auth/register', async (req, res) => {
  const { email, password, role } = req.body; // role: admin, staff, renter
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lưu vào DB (MongoDB hoặc MySQL - tùy chọn)
  // const newUser = new User({ email, password: hashedPassword, role });
  // await newUser.save();

  res.status(201).json({ message: 'User registered successfully!' });
});

// Đăng nhập
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Giả sử lấy dữ liệu từ DB
  // const user = await User.findOne({ email });

  // Mẫu user (có thể thay đổi khi kết nối DB)
  const user = { email: 'admin@example.com', password: '$2a$10$yKmUsWVekCmTXPqHHiDt3uW1mpMWjIPYflG.EFXyXgEC5UpGyMkBC', role: 'admin' };

  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Tạo JWT token
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// ========================
// FORWARD TO ANALYTICS SERVICE (BẮT TẤT CẢ REQUEST /api/analytics/*)
// ========================
app.use("/api/analytics", verifyToken, (req, res) => {
  axios({
    url: `${ANALYTICS_URL}${req.url}`,
    method: req.method,
    data: req.body
  })
  .then(r => res.json(r.data))
  .catch(err => {
    res.status(500).json({ error: "Analytics Service unreachable", detail: err.message });
  });
});

// ========================
// FORWARD REQUEST: METRICS
// ========================
/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get key metrics from Analytics Service
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: Returns key system metrics (rentals, revenue, peak hours)
 *       500:
 *         description: Failed to fetch metrics
 */
app.get('/api/metrics', verifyToken, async (req, res) => {
  try {
    const r = await axios.get(`${ANALYTICS_URL}/metrics`);
    res.json(r.data);
  } catch (e) {
    res.status(502).json({ error: 'Analytics unreachable', detail: e.message });
  }
});

// ========================
// FORWARD REQUEST: HISTORY
// ========================
app.get('/api/history', verifyToken, async (req, res) => {
  try {
    const r = await axios.get(`${ANALYTICS_URL}/history`);
    res.json(r.data);
  } catch (e) {
    res.status(502).json({ error: 'Analytics unreachable', detail: e.message });
  }
});

// ========================
// FORWARD REQUEST: FORECAST
// ========================
app.get('/api/forecast', verifyToken, async (req, res) => {
  try {
    const r = await axios.get(`${ANALYTICS_URL}/forecast`, { params: req.query });
    res.json(r.data);
  } catch (e) {
    res.status(502).json({ error: 'Analytics unreachable', detail: e.message });
  }
});

// ========================
// TẠO BÁO CÁO PDF
// ========================
app.post('/api/report/pdf', verifyToken, async (req, res) => {
  try {
    const r = await axios.post(`${REPORTS_URL}/report/pdf`, req.body, { responseType: 'arraybuffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    res.send(Buffer.from(r.data, 'binary'));
  } catch (e) {
    res.status(502).json({ error: 'Reports unreachable', detail: e.message });
  }
});

// ========================
// TẠO BÁO CÁO EXCEL
// ========================
app.post('/api/report/excel', verifyToken, async (req, res) => {
  try {
    const r = await axios.post(`${REPORTS_URL}/report/excel`, req.body, { responseType: 'arraybuffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(Buffer.from(r.data, 'binary'));
  } catch (e) {
    res.status(502).json({ error: 'Reports unreachable', detail: e.message });
  }
});

// ========================
// KHỞI CHẠY GATEWAY
// ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway listening on http://localhost:${PORT}`);
});
