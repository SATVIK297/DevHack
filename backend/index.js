import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoutes from './routes/user.routes.js'
import employeeRoutes from './routes/employee.routes.js'
import wardenRoutes from './routes/warden.routes.js'

import connectDB from './config/db.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

connectDB();




app.use('/api/v1/students', userRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/warden', wardenRoutes);






app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error happened';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
