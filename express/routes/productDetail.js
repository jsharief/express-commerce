const express = require("express");
const router = express.Router();

const productController = require('../controllers/productsController');
 
router.get("/product", productController.getProduct);

module.exports = router;

 