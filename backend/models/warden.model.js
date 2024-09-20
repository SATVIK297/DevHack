import mongoose ,{Schema} from "mongoose";

const hostelWardenSchema = new Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  block: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String }
},{timestamps: true });

const HostelWarden = mongoose.model('HostelWarden', hostelWardenSchema);

export default HostelWarden;