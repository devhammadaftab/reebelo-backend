const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { bootstrapDatabase } = require("./config/db.config");
const ProductCategoryRoute = require("./routes/productCategory.route");
const ProductRoute = require("./routes/product.route");
const OrderRoute = require("./routes/order.route");
require("dotenv").config();

//app middlewares
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//upload directory
app.use("/public", express.static("public"));

//bootstraping database
bootstrapDatabase(process.env.MONGO_URL);

//routes
app.use("/product/category", ProductCategoryRoute);
app.use("/product/", ProductRoute);
app.use("/order", OrderRoute);

// 404 Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//error handling

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Application running on ${process.env.PORT}`);
});
