import express from 'express';
import { signup, signin, verifyOtp } from '../controllers/warden.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-otp', verifyOtp); // Add this route for verifying OTP

export default router;
