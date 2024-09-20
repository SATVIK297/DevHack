import mongoose ,{Schema} from "mongoose";

const employeeSchema = new Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  block: { type: String, required: true },
  designation: { 
    type: String, 
    required: true, 
    enum: ['janitor', 'carpenter', 'electrician'] 
  },
  password: { type: String, required: true },
  otp: { type: String }
},{timestamps: true });


const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;