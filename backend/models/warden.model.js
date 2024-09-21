import mongoose from 'mongoose';

const wardenSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true }, // Unique employee ID for the warden
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  block: { type: String, required: true }, // Block where the warden is assigned
  password: { type: String, required: true }, // Hashed password
  otp: { type: String },
  otpExpiration: { type: Date },
  verified: { type: Boolean, default: false } // Flag to indicate if the account is verified
});

const Warden = mongoose.model('Warden', wardenSchema);

export default Warden;
