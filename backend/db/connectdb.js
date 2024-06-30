const mongoose = require("mongoose")

const ConnectDb = () => {

  try {
    mongoose.set('strictQuery', true);
    const data = mongoose.connect("mongodb://localhost:27017/phoenix-mern-app");
    if (data) console.log(`connected to MongoDb`)
  } catch (err) {
    console.log("Db Connection error", err)
  }
}
module.exports = ConnectDb
