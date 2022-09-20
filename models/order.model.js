const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const OrderAddress = require("./orderAddress.model");
const Schema = mongoose.Schema;

//Order Schema
const OrderSchema = new Schema(
  {
    orderTrackingId: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    totalAmount: {
      type: Schema.Types.Number,
      require: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: OrderAddress,
      require: true,
    },
    status: {
      type: String,
      enum: ["processing", "cancelled", "delivered"],
      default: "processing",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

//Plugins
OrderSchema.plugin(softDeletePlugin);

module.exports = mongoose.model("Order", OrderSchema);
