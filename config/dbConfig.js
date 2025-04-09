const mongoose = require("mongoose");
require("dotenv").config();
try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB Connected Successfully");
  });
} catch (e) {
  console.error(`Error Occured during connecting with the mongoDB, err: ${e}`);
}

module.exports = mongoose;
