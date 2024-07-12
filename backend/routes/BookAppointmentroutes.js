const express = require("express");
router = express.Router();
const path = require('path'); // for path of folder
const fs = require('fs'); //for folder creation
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const {name} = req.body;
      const uploadPath = path.join(__dirname, `../../frontend/public/uploads/Prescription/${name}/`);
      fs.mkdir(uploadPath, { recursive: true }, (err) => {

        if (err) {
          return cb(err);
        } else {
          cb(null, uploadPath);
        }

      }); // makdirectory

    }, // destination
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
