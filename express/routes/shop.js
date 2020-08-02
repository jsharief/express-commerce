const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");
const checkoutController = require("../controllers/checkoutController");




router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProduct);

router.get("/cart", productController.getCart);

router.get("/calculateShipping/:method", checkoutController.handleCalculateShipping);

router.get("/checkout", cartController.handleCheckout);

router.get("/orders", productController.getOrders);

router.post("/addToCart",cartController.addToCart);

router.post("/payment",checkoutController.handleStripePayment);

router.get("/delete/:itemId",cartController.deleteCartItem);

router.get("/checkout/success",checkoutController.handlePaymentSuccess);

router.get("/orderConfirmation",checkoutController.handleConfirmOrder);

  
module.exports = router;
