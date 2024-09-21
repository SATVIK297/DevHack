import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  block: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiration: { type: Date },
  verified: { type:   Boolean, default: false }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
