const express = require("express");
const router = express.Router();
const ProdudctCategoryController = require("../controllers/ProdudctCategoryController");

router.get("/", ProdudctCategoryController.index);
router.get("/:id", ProdudctCategoryController.find);
router.post("/add", ProdudctCategoryController.store);
router.put("/edit/:id", ProdudctCategoryController.update);
router.delete("/delete/:id", ProdudctCategoryController.delete);
router.get("/restore/:id", ProdudctCategoryController.restore);

module.exports = router;
