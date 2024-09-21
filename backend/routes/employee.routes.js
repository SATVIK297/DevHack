import express from 'express';
import { signup, verifyOtp, signin, updateServiceStatus, getServiceRequestsByEmployee } from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/signin', signin);
router.put('/status/:id', updateServiceStatus); 
router.get('/request/:id',getServiceRequestsByEmployee);



export default router;
