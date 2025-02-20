const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Order routes
router.get("/fetchOrders", orderController.getOrders);
router.post("/placeOrder", orderController.placeOrders);
router.put("/updateOrder/:id", orderController.updateOrder);
router.delete("/deleteOrder/:id", orderController.deleteOrder);

module.exports = router;
