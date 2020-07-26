const express = require("express");
const router = express.Router();
const agentController = require("../controller/agentController");

router.get("/login", agentController.getLogin);

router.get("/add-product", agentController.getAddProduct);

router.get("/signup", agentController.getSignUp);

router.post("/create", agentController.handleCreate);

router.get("/", agentController.getLogin);


module.exports = router;
``