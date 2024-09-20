import express from 'express';
import { signup, verifyOtp, signin } from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/signin', signin); 

export default router;
