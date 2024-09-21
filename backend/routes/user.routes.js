import express from 'express'

import { signup, signin, verifyOtp }from '../controllers/user.controller.js';
import { getServiceHistory, serviceRequest } from '../controllers/services.controller.js';


const router = express.Router();

router.post('/signup', signup);

router.post('/verify-otp', verifyOtp);

router.post('/signin', signin);

router.post('/service',serviceRequest);

router.get('/status/:id',getServiceHistory);


export default router;