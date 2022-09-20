const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { ProductUpload } = require("../config/storage.config");

router.get("/", ProductController.index);
router.get("/:key", ProductController.find);
router.post("/add", ProductUpload.single("image"), ProductController.store);
router.put(
  "/edit/:id",
  ProductUpload.single("image"),
  ProductController.update
);
router.delete("/delete/:id", ProductController.delete);
router.get("/restore/:id", ProductController.restore);

module.exports = router;
