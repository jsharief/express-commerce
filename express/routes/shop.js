const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");




router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProduct);

router.get("/cart", productController.getCart);

router.get("/checkout", productController.getCheckout);

router.get("/orders", productController.getOrders);

router.post("/addToCart",cartController.addToCart);

module.exports = router;
