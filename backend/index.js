import express from 'express'

import userRoutes from './routes/user.routes.js'
import employeeRoutes from './routes/employee.routes.js'
import wardenRoutes from './routes/warden.routes.js'

import connectDB from './config/db.js';


const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Use Routes
app.use('/api/v1/students', userRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/warden', wardenRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
