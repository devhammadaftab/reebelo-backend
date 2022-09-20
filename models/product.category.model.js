const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const Schema = mongoose.Schema;

//ProductCategory Schema
const ProductCategorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
      type: String,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
  }
);

//Plugins
ProductCategorySchema.plugin(softDeletePlugin);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
