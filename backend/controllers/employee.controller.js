import Employee from '../models/employee.model.js';
import { sendOtpEmail, generateOtp } from '../services/otpservice.js';
import bcrypt from 'bcryptjs'; // Make sure to install bcryptjs
import jwt from 'jsonwebtoken'
import Services from "../models/services.model.js"; // Import Services model
import {errorHandler} from "../middlewares/error.js"; // Custom error handler

import User from "../models/user.model.js"; // Import User model to fetch block info

export const signup = async (req, res) => {
  const { empId, name, email, block, designation, password } = req.body;

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ error: 'Employee already registered' });
    }

    const otp = generateOtp();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new employee object
    employee = new Employee({
      empId,
      name,
      block,
      email,
      designation,
      password: hashedPassword, // Use the hashed password
      otp,
      otpExpiration,
    });

    await employee.save();
    await sendOtpEmail(email, otp); // Send OTP to employee's email

    return res.status(201).json({ message: 'Employee registered. OTP sent to email.' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      return res.status(400).json({ error: 'Email or empId already exists' });
    }
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const {  otp } = req.body;

  try {
    const employee = await Employee.findOne({ otp });
    if (!employee) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (employee.otp !== otp || employee.otpExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    employee.verified = true;
    employee.otp = undefined; // Clear OTP after verification
    employee.otpExpiration = undefined; // Clear expiration
    await employee.save();

    res.status(200).json({ message: 'OTP verified. Employee is now verified.' });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ error: 'Employee not found' });
    }

    //console.log('Employee:', employee); // Log employee details

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!employee.verified) {
      return res.status(400).json({ error: 'Account not verified. Please verify OTP.' });
    }

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const { password: pass, ...rest } = employee._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        rest, 
        message: "signed in successfully"
      });

  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Update service request status from 'pending' to 'done'
export const updateServiceStatus = async (req, res, next) => {
  try {
    const  serviceId  = req.params.id; // Employee sends serviceId in params

    // Find the service request by its ID
    const serviceRequest = await Services.findById(serviceId);

    // If service request is not found
    if (!serviceRequest) {
      return next(errorHandler(404, "Service request not found"));
    }

    // Update the status of the service request to 'done'
    serviceRequest.status = "completed";

    // Save the updated service request to the database
    await serviceRequest.save();

    // Send success response
    return res.status(200).json({
      message: "Service request status marked as 'done' successfully",
      data: serviceRequest,
    });
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Something went wrong. Please try again."));
  }
};




// Get service requests based on employee's ID, designation, and block
export const getServiceRequestsByEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id; // Employee sends their employeeId in params

    // Find the employee by their ID
    const employee = await Employee.findById(employeeId);

    // If employee not found
    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }

    // Get the employee's designation and block
    const { designation, block: employeeBlock } = employee;

    //console.log(`Employee designation: ${designation}, Block: ${employeeBlock}`);

    // Define the service types based on the employee's designation
    let serviceType;
    switch (designation.toLowerCase()) {
      case "room cleaner":
        serviceType = "Room Cleaning";
        break;
      case "electrician":
        serviceType = "Electricity";
        break;
      case "carpenter":
        serviceType = "Furniture";
        break;
      default:
        return next(errorHandler(400, "Invalid designation"));
    }

    // Find all service requests related to the employee's service type
    const serviceRequests = await Services.find({ serviceType });

    if (serviceRequests.length === 0) {
      return res.status(404).json({
        message: `No service requests found for designation: ${designation}`,
      });
    }

    // Filter service requests where the student's block matches the employee's block
    const filteredRequests = [];
    for (const request of serviceRequests) {
      // Find the student by the userId in the service request
      const student = await User.findById(request.userId);
      
      if (student && student.block === employeeBlock) {
        filteredRequests.push(request); // Add to filtered results if block matches
      }
    }

    // If no service requests found after filtering by block
    if (filteredRequests.length === 0) {
      return res.status(404).json({
        message: `No service requests found for designation: ${designation} in block: ${employeeBlock}`,
      });
    }

    // Return the filtered service requests
    return res.status(200).json({
      message: `Service requests for designation: ${designation} in block: ${employeeBlock}`,
      data: filteredRequests,
    });
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Something went wrong. Please try again."));
  }
};
