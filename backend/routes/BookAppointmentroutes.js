const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Prescription', // Folder where images will be stored on Cloudinary
      format: async (req, file) => 'webp', // supports promises as well
      public_id: (req, file) => `${Date.now()}_${file.originalname}`,
    },
  });
  
  // Middleware to handle file uploads
  const upload = multer({ storage: storage });





const { updateAppointmentStatus, deleteAppointment, Appointments, AppointmentController } = require('../controllers/AppointmentController');
const AppointmentMiddleware = require("../middleware/appointmentMiddleware");


// Define routes
router.post("/appointment", upload.single('prescription'), AppointmentMiddleware, AppointmentController);
router.get("/get-appointments", Appointments);
router.get('/appointments', Appointments);
router.put('/appointments/status', updateAppointmentStatus);
router.post('/appointments/:id', deleteAppointment);

module.exports = router;
