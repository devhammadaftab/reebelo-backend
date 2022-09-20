const mongoose = require("mongoose");
const ProductCategory = require("./product.category.model");
const Order = require("./order.model");
const Product = require("./product.model");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const Schema = mongoose.Schema;

//OrderDetails Schema
const OrderDetailSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: Order,
      require: true,
    },
    productId: {
      type: String,
      ref: Product,
      require: true,
    },
    quantity: {
      type: Schema.Types.Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

//Plugins
OrderDetailSchema.plugin(softDeletePlugin);

module.exports = mongoose.model("OrderDetails", OrderDetailSchema);
