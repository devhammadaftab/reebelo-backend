const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.index);
router.post("/place-order", OrderController.store);
router.put("/edit/:id", OrderController.update);
router.put("/status/:id", OrderController.update);
module.exports = router;
