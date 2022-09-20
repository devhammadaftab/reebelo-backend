const mongoose = require("mongoose");
const ProductCategory = require("./product.category.model");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const Schema = mongoose.Schema;

//Product Schema
const ProductSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    slug: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    price: {
      type: Schema.Types.Number,
      require: true,
    },
    image: {
      type: Schema.Types.String,
      require: true,
    },
    stock: {
      type: Schema.Types.Number,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: ProductCategory,
    },
  },
  {
    timestamps: true,
  }
);

//Plugins
ProductSchema.plugin(softDeletePlugin);

module.exports = mongoose.model("Product", ProductSchema);
