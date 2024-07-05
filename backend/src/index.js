const express = require("express");
require('dotenv').config();

app = express()
const cors = require('cors')



app.use(express.json())
app.use(cors())



const AdminRoutes = require("../routes/adminroutes");
const UserRoutes = require("../routes/UserRoutes");
const ProductRoutes = require("../routes/Productroutes");
const BookAppointment = require("../routes/BookAppointmentroutes");

const connectDb = require("../db/connectdb");
connectDb();

PORT = process.env.PORT || 3000;


app.use("/api",AdminRoutes);
app.use("/api",UserRoutes);
app.use("/api",ProductRoutes);
app.use("/api",BookAppointment);





app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})