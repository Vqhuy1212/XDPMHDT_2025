import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  renterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  totalCost: { type: Number },
}, { timestamps: true });

const Rental = mongoose.model('Rental', rentalSchema);

export default Rental;
