const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Define routes
router.get("/fetchProducts", productController.getProducts);
router.post("/addProduct", productController.addProducts);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
