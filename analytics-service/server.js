import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HoltWinters } from 'node-svr';  // Thêm HoltWinters cho dự báo
import { forecastRentals } from './services/forecastService.js';  // Thêm dự báo theo Holt-Winters

dotenv.config();

// Khởi tạo ứng dụng express
const app = express();
app.use(cors());
app.use(express.json());

// =============================
// MongoDB Connect
// =============================
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ev-rental', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// =============================
// Models
// =============================
const rentalSchema = new mongoose.Schema({
  vehicleId: String,
  renterId: String,
  startTime: Date,
  endTime: Date,
  totalCost: Number,
});

const vehicleSchema = new mongoose.Schema({
  name: String,
  type: String,
  stationId: String,
});

const Rental = mongoose.model('Rental', rentalSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// ========================
// API: DỰ BÁO Nhu Cầu Thuê Xe (Holt-Winters)
// ========================
app.get("/forecast", async (req, res) => {
  const rentals = await Rental.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$startTime" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const rentalCounts = rentals.map(r => r.count);

  const forecast = forecastRentals(rentalCounts);  // Dự báo 6 tháng tới

  res.json({ forecast });
});

// ========================
// API: TẠO PHƯƠNG TIỆN
// ========================
app.post('/vehicles', async (req, res) => {
  const { name, type, stationId } = req.body;
  const vehicle = new Vehicle({ name, type, stationId });

  try {
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create vehicle', detail: err.message });
  }
});

// ========================
// API: TẠO LỊCH THUÊ XE
// ========================
app.post('/rentals', async (req, res) => {
  const { vehicleId, renterId, startTime, endTime, totalCost } = req.body;
  const rental = new Rental({ vehicleId, renterId, startTime, endTime, totalCost });

  try {
    await rental.save();
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create rental', detail: err.message });
  }
});

// ========================
// API: DOANH THU THEO NGÀY
// ========================
app.get('/analytics/revenue/daily', async (req, res) => {
  try {
    const revenue = await Rental.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          totalRevenue: { $sum: "$totalCost" },
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(revenue);
  } catch (e) {
    res.status(500).json({ error: 'Error calculating daily revenue', detail: e.message });
  }
});

// ========================
// API: DOANH THU THEO THÁNG
// ========================
app.get('/analytics/revenue/monthly', async (req, res) => {
  try {
    const revenue = await Rental.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$startTime" } },
          totalRevenue: { $sum: "$totalCost" },
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(revenue);
  } catch (e) {
    res.status(500).json({ error: 'Error calculating monthly revenue', detail: e.message });
  }
});

// ========================
// API: GIỜ CAO ĐIỂM
// ========================
app.get('/analytics/peak-hours', async (req, res) => {
  try {
    const rentals = await Rental.find();

    const hours = new Array(24).fill(0);
    rentals.forEach(rental => {
      const hour = new Date(rental.startTime).getHours();
      hours[hour]++;
    });

    const peakHour = hours.indexOf(Math.max(...hours));

    res.json({ peakHour, distribution: hours });
  } catch (e) {
    res.status(500).json({ error: 'Error calculating peak hours', detail: e.message });
  }
});

// ========================
// API: DỰ BÁO NHU CẦU THUÊ (Linear Regression)
// ========================
function linearRegression(data) {
  const n = data.length;
  const sumX = data.reduce((a, b, i) => a + i, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = data.reduce((a, b, i) => a + i * b, 0);
  const sumX2 = data.reduce((a, b, i) => a + i * i, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

app.get('/analytics/forecast', async (req, res) => {
  try {
    const rentals = await Rental.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const rentalCounts = rentals.map(r => r.count);

    const { slope, intercept } = linearRegression(rentalCounts);

    const nextDayIndex = rentalCounts.length;
    const forecast = slope * nextDayIndex + intercept;

    res.json({ forecast: Math.round(forecast) });
  } catch (e) {
    res.status(500).json({ error: 'Error calculating forecast', detail: e.message });
  }
});

// ========================
// KHỞI CHẠY SERVICE
// ========================
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Analytics Service running on http://localhost:${PORT}`);
});
