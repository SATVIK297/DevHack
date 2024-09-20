import nodemailer from 'nodemailer';
import crypto from 'crypto';

// OTP generator
export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user:'biggamer1923@gmail.com',
    pass:'paysnaxegkbxdjhb'
  }
});

// Send OTP to student's email
export const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: 'biggamer1923@gmail.com',
      to: email,
      subject: 'Your OTP for Hostel Management System',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
    });
  } catch (error) {
    throw new Error('Failed to send OTP email.');
  }
};
