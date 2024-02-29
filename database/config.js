const mongoose = require("mongoose");

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("Data Base online");
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to connect to database");
  }
};

module.exports = mongodbConnection;
