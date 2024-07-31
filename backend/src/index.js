const express = require("express");
require('dotenv').config();

app = express()
const cors = require('cors')



app.use(express.json())
app.use(cors())

const connectDb = require("../db/connectdb");
connectDb();


// For Admin
const AdminRoutes = require("../routes/adminroutes");
app.use("/api",AdminRoutes);

// For User
const UserRoutes = require("../routes/UserRoutes");
app.use("/api",UserRoutes);

// For Product
const ProductRoutes = require("../routes/Productroutes");
app.use("/api",ProductRoutes);

// For Appointment
const BookAppointment = require("../routes/BookAppointmentroutes");
app.use("/api",BookAppointment);

// For Cart
const CartRoutes = require("../routes/cartRoutes");
app.use("/api",CartRoutes);


// For Order
const OrderRoutes = require("../routes/OrderRoutes");
app.use("/api",OrderRoutes);

PORT = process.env.PORT || 3000;







app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})