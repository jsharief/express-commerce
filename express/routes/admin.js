const express = require("express");
const router = express.Router();
const methods = require("../util/path");
const productController = require("../controllers/productsController");

let users = [
  {
    id: 1,
    name: "Test",
  },
  {
    id: 2,
    name: "Tapper Monkey",
  },
  {
    id: 3,
    name: "Argentina",
  },
];

router.post("/add-product", productController.postAddProduct);

router.get("/add-product", productController.getAddProduct);

router.get("/users", (req, res, next) => {
  console.log("Here..." + users);

  for (let user of users) {
    console.log("**" + user.name);
  }

  console.log(req.body);
  res.send(users);
});

exports.routes = router;
