import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

const studentSchema  = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  block: { type: String, required: true },
  room: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiration: { type: Date },
  verified: { type: Boolean, default: false }
},{timestamps: true })


studentSchema.pre('save', async function (next) {
  console.log('first')
  if (!this.isModified('password')) return next();

  try {
    console.log('reach here')
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('reach here')
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Student = mongoose.model('Student', studentSchema);

export default Student; 