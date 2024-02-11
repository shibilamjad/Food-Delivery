const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected:", connection.host);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDb;
