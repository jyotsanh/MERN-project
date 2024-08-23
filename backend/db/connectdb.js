const mongoose = require("mongoose");

const ConnectDb = () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/EyeMate";

  mongoose.set('strictQuery', true);
  
  mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Db Connection error:", err));
}

module.exports = ConnectDb;

