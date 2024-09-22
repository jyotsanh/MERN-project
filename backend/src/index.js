const express = require("express");
require('dotenv').config();

const app = express();
const cors = require('cors');
const path = require('path');

// Middleware
app.use(express.json());

// Apply CORS to allow requests from your frontend
const allowedOrigins = ['http://localhost:5173','https://eyemate.vercel.app'];  // Add more domains as needed
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true  // Enable this if your requests include credentials (cookies, auth headers, etc.)
}));
// Connect to the database
const connectDb = require("../db/connectdb");
connectDb();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// For Admin
const AdminRoutes = require("../routes/adminroutes");
app.use("/api", AdminRoutes);

// For User
const UserRoutes = require("../routes/UserRoutes");
app.use("/api", UserRoutes);

// For Product
const ProductRoutes = require("../routes/Productroutes");
app.use("/api", ProductRoutes);

// For Appointment
const BookAppointment = require("../routes/BookAppointmentroutes");
app.use("/api", BookAppointment);

// For Cart
const CartRoutes = require("../routes/cartRoutes");
app.use("/api", CartRoutes);

// For Order
const OrderRoutes = require("../routes/OrderRoutes");
app.use("/api", OrderRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
