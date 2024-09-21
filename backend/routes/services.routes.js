import express from 'express';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/signin', signin); 

export default router;
