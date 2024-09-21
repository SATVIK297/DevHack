import mongoose, { Schema } from "mongoose";

// Services Schema
const servicesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", 
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], 
      default: "pending",
    },
    serviceType: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

// Services Model
const Services = mongoose.model("Services", servicesSchema);

export default Services;
