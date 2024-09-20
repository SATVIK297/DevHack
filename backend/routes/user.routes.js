import express from 'express'

import { signup, signin, verifyOtp }from '../controllers/user.controller.js';


const router = express.Router();

router.post('/signup', signup);

router.post('/verify-otp', verifyOtp);

router.post('/signin', signin);

export default router;