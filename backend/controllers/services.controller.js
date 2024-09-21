import Services from "../models/services.model.js"; // Assuming Services model is in the models directory
import Student from "../models/user.model.js"; // Assuming User model is also in the models directory
import {errorHandler} from "../middlewares/error.js"; // Assuming errorHandler is a custom error handler utility

export const serviceRequest = async (req, res, next) => {
  try {
    const { rollnum, date, time, description, serviceType } = req.body;

    // Validate required fields
    if (!rollnum || !date || !time || !serviceType) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Find the user by roll number (assuming roll number is unique)
    const existedUser = await Student.findOne({ registrationNumber: rollnum });

    if (!existedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Create a new Service document
    const service = new Services({
      userId: existedUser._id, // Reference to the user
      date,
      time,
      description,
      status: "pending", // Default to "pending"
      serviceType,
    });

    // Save the service request to the database
    await service.save();

    // Send success response
    return res.status(201).json({
      message: "Service request submitted successfully",
      data: service,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return next(errorHandler(500, "Something went wrong. Please try again."));
  }
};


// export const getServiceHistory = async (req, res, next) => {
//     try {
//       const  userId  = req.params.id;
  
//       // Validate the presence of userId
//       if (!userId) {
//         return next(errorHandler(400, "User ID is required"));
//       }
  
//       // Find all services related to the user by userId
//       const serviceHistory = await Services.find({ userId });
  
//       // If no services found
//       if (serviceHistory.length === 0) {
//         return res.status(404).json({
//           message: "No service history found for this user",
//         });
//       }
  
//       // Send success response with service history
//       return res.status(200).json({
//         message: "Service history retrieved successfully",
//         data: serviceHistory,
//       });
//     } catch (error) {
//       console.error(error);
//       return next(errorHandler(500, "Something went wrong. Please try again."));
//     }
//   };


export const getServiceHistory = async (req, res, next) => {
  try {
      const rollnum = req.params.id;

      // Validate the presence of roll number
      if (!rollnum) {
          return next(errorHandler(400, "Roll number is required"));
      }

      // Find the user by roll number
      const existedUser = await Student.findOne({ registrationNumber: rollnum });
      
      if (!existedUser) {
          return next(errorHandler(404, "User not found"));
      }

      // Find all services related to the user by userId
      const serviceHistory = await Services.find({ userId: existedUser._id });

      // If no services found
      if (serviceHistory.length === 0) {
          return res.status(404).json({
              message: "No service history found for this user",
          });
      }

      // Send success response with service history
      return res.status(200).json({
          message: "Service history retrieved successfully",
          data: serviceHistory,
      });
  } catch (error) {
      console.error(error);
      return next(errorHandler(500, "Something went wrong. Please try again."));
  }
};
