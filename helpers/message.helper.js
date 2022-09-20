require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV;

exports.errorMessage = (error) => {
  return NODE_ENV == "development" ? error.message : "Some thing went wrong";
};
