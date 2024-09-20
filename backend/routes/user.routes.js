import express from 'express'

import { signup, signin, verifyOtp }from '../controllers/user.controller.js';


const router = express.Router();

// POST /students/signup
router.post('/signup', signup);

// POST /students/verify-otp
router.post('/verify-otp', verifyOtp);

// POST /students/signin
router.post('/signin', signin);

export default router;