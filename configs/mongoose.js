const env = require("./environment");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// MongoDB connection
const db = async function main() {
  await mongoose.connect(env.mongodb_URI, {
    useNewUrlParser: true,
  });
  console.log("Successfully connected to db");
};

module.exports = db;
