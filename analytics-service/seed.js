import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Vehicle from './models/Vehicle';
import Rental from './models/Rental';

dotenv.config();

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Sinh dữ liệu mẫu cho Users, Vehicles và Rentals
const seedDatabase = async () => {
  try {
    // Xóa tất cả dữ liệu cũ trước khi thêm mới
    await User.deleteMany();
    await Vehicle.deleteMany();
    await Rental.deleteMany();

    // Tạo mẫu Users (Admin, Staff, Renter)
    const admin = new User({
      email: 'admin@ev-rental.com',
      password: 'admin123',
      role: 'admin',
    });

    const staff = new User({
      email: 'staff@ev-rental.com',
      password: 'staff123',
      role: 'staff',
    });

    const renter = new User({
      email: 'renter@ev-rental.com',
      password: 'renter123',
      role: 'renter',
    });

    await admin.save();
    await staff.save();
    await renter.save();

    console.log('Users created');

    // Tạo mẫu Vehicles
    const vehicles = [
      { vehicleId: 'V001', status: 'available', stationId: 'Station001' },
      { vehicleId: 'V002', status: 'rented', stationId: 'Station002' },
      { vehicleId: 'V003', status: 'available', stationId: 'Station003' },
    ];

    await Vehicle.insertMany(vehicles);
    console.log('Vehicles created');

    // Tạo mẫu Rentals (dữ liệu thuê xe)
    const rentals = [
      {
        vehicleId: 'V001',
        renterId: 'renter@ev-rental.com',
        startTime: new Date('2025-01-01T10:00:00Z'),
        endTime: new Date('2025-01-01T11:00:00Z'),
        totalCost: 20,
      },
      {
        vehicleId: 'V002',
        renterId: 'renter@ev-rental.com',
        startTime: new Date('2025-01-01T12:00:00Z'),
        endTime: new Date('2025-01-01T13:30:00Z'),
        totalCost: 30,
      },
    ];

    await Rental.insertMany(rentals);
    console.log('Rentals created');

    mongoose.connection.close(); // Đóng kết nối MongoDB
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  }
};

// Seed dữ liệu
seedDatabase();
