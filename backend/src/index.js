const express = require("express");
app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


const AdminRoutes = require("../routes/adminroutes");
const UserRoutes = require("../routes/UserRoutes");
const ProductRoutes = require("../routes/Productroutes");

const connectDb = require("../db/connectdb");
connectDb();

PORT = 3000


app.use("/api",AdminRoutes);
app.use("/api",UserRoutes);
app.use("/api",ProductRoutes);





app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})