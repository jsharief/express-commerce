const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/login", accountController.getLogin);

router.post("/processLogin", accountController.processLogin);

router.get("/logout", accountController.processLogout);

router.get("/signup", accountController.getSignUp);

router.get("/validateEmail", accountController.validateEmail);

router.post("/processSignup", accountController.processSignup);

module.exports = router;
