import Warden from '../models/warden.model.js';
import bcrypt from 'bcryptjs';
import { sendOtpEmail, generateOtp } from '../services/otpservice.js';

import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { empId, name, email, block, password } = req.body;

  try {
    let warden = await Warden.findOne({ email });
    if (warden) {
      return res.status(400).json({ error: 'Warden already registered' });
    }

    const otp = generateOtp();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    warden = new Warden({
      empId,
      name,
      email,
      block,
      password: hashedPassword,
      otp,
      otpExpiration
    });

    await warden.save();
    await sendOtpEmail(email, otp);

    return res.status(201).json({ message: 'Warden registered. OTP sent to email.' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


export const verifyOtp = async (req, res) => {
  const {  otp } = req.body;

  try {
    // Find the warden by email
    const warden = await Warden.findOne({ otp });
    if (!warden) {
      return res.status(400).json({ error: 'Warden not found' });
    }

    // Check if the OTP has expired
    if (warden.otpExpiration < Date.now()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Verify the OTP
    if (warden.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // If OTP is valid, mark the account as verified
    warden.verified = true;
    warden.otp = null; // Clear OTP
    warden.otpExpiration = null; // Clear OTP expiration
    await warden.save();

    return res.status(200).json({ message: 'Warden account verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const warden = await Warden.findOne({ email });
    if (!warden) {
      return res.status(400).json({ error: 'Warden not found' });
    }

    const isMatch = await bcrypt.compare(password, warden.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!warden.verified) {
      return res.status(400).json({ error: 'Account not verified. Please verify OTP.' });
    }

    const token = jwt.sign({ id: warden._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const { password: pass, ...rest } = warden._doc;

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
