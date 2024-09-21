import Student from '../models/user.model.js';

import {generateOtp,sendOtpEmail}  from '../services/otpservice.js'

import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
  const { registrationNumber, name, email, block,room, password } = req.body;

  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ error: 'Student already registered' });
    }

    const otp = generateOtp();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10-minute expiration

    student = new Student({
      registrationNumber,
      name,
      email,
      block,
      room,
      password,
      otp,
      otpExpiration
    });

    await student.save();
    await sendOtpEmail(email, otp);

    return res.status(201).json({ message: 'Student registered. OTP sent to email.' });
  } catch (error) {
    console.error('Signup error:', error); // Log the error for debugging
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};


// Verify OTP
export const  verifyOtp = async (req, res) => {
  const {  otp } = req.body;

  try {
    const student = await Student.findOne({ otp });
    if (!student) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Check if OTP is valid and not expired
    if (student.otp !== otp || student.otpExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    student.verified = true;
    student.otp = undefined;
    student.otpExpiration = undefined;
    await student.save();

    res.status(200).json({ message: 'OTP verified. Student is now verified.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Signin route
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    // Check password
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if verified
    if (!student.verified) {
      return res.status(400).json({ error: 'Account not verified. Please verify OTP.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const { password: pass, ...rest } = student._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        rest, 
        message: "signed in successfully"
      });

    //res.status(200).json({ token, message: 'Signed in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
