const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { updateAppointmentStatus, deleteAppointment, Appointments, AppointmentController } = require('../controllers/AppointmentController');
const AppointmentMiddleware = require("../middleware/appointmentMiddleware");

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { name } = req.body;
        const uploadPath = path.join(__dirname, `../../frontend/public/uploads/Prescription/${name}/`);
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, uploadPath);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Define routes
router.post("/appointment", upload.single('prescription'), AppointmentMiddleware, AppointmentController);
router.get("/get-appointments", Appointments);
router.get('/appointments', Appointments);
router.put('/appointments/status', updateAppointmentStatus);
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;
