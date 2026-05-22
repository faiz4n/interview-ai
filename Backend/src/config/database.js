const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED!");
  } catch (err) {
    console.log("MONGODB ERROR: ", err);
  }
}

module.exports = connectToDB;
