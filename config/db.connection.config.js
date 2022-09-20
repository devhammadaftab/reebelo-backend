const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("🚀 ~ process.env.MONGO_URL", process.env.MONGO_URL);

const dbConnection = mongoose.connection;

dbConnection.on("error", () =>
  console.error.bind(console, "Database transaction link is not setup")
);

dbConnection.once("open", () =>
  console.info("Database transaction link is up")
);

module.exports = dbConnection;
