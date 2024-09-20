import Employee from '../models/employee.model.js';
import { sendOtpEmail, generateOtp } from '../services/otpservice.js';
import bcrypt from 'bcryptjs'; // Make sure to install bcryptjs
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  const { empId, name, email,block, phone, designation, password } = req.body;

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
      phone,
      designation,
      password: hashedPassword, // Use the hashed password
      otp,
      otpExpiration
    });

    await employee.save();
    await sendOtpEmail(email, otp);

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
  const { email, otp } = req.body;

  try {
    const employee = await Employee.findOne({ email });
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

    console.log('Employee:', employee); // Log employee details

    // Check password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if verified
    if (!employee.verified) {
      return res.status(400).json({ error: 'Account not verified. Please verify OTP.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ token, message: 'Signed in successfully' });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
