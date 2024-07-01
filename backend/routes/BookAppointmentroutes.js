const express = require("express");
router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, '../frontend/public/uploads/Prescription/');

    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const {AppointmentController,Appointments} = require("../controllers/AppointmentController");
const AppointmentMiddleware = require("../middleware/appointmentMiddleware");


router.post("/appointment",upload.single('prescription'),AppointmentMiddleware, AppointmentController);
router.get("/get-appointments", Appointments);

module.exports = router;
