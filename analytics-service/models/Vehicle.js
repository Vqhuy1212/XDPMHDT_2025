import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'rented', 'maintenance'], default: 'available' },
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
