const mongoose = require("mongoose");
const bootstrapDatabase = (connectionString) => {
  mongoose.connect(connectionString, { useNewUrlParser: true }, (err) => {
    if (!err) {
      console.log("Database bootstraped successfully");
      console.log("Database Connected to :" + process.env.MONGO_DB);
    } else {
      console.log("Error in DB connection : " + err.stack);
    }
  });
  mongooseConnection = mongoose.connection;
};

module.exports = {
  bootstrapDatabase,
};
