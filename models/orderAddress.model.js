const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("../models/order.model");

//OrderAddress Schema
const OrderAddressSchema = new Schema(
  {
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    zipCode: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderAddress", OrderAddressSchema);
