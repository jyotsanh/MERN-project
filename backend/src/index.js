const express = require("express");
const AdminRoutes = require("../routes/adminroutes");
const connectDb = require("../db/connectdb");

connectDb();

PORT = 3000
app = express()
app.use(express.json())




app.use("/",AdminRoutes);






app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})