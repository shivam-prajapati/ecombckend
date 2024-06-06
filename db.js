const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected", connection.host, connection.name);
  } catch (err) {
    console.log("ERROR IN DB ", err);
    process.exit(1);
  }
};

module.exports = connectDb;
