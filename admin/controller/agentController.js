const bcrypt = require("bcryptjs");
const Agent = require("../model/agentSchema");
const Product = require("../model/productSchema");

exports.getLogin = (req, res, next) => {
  res.render("admin/login", {
    pageTitle: "Administrator Login",
    path: "/agent/login",
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/agent/add-product",
    editing: false,
  });
};

exports.getSignUp = (req, res, next) => {
  console.log("...Sign up....");
  res.render("admin/signup", {
    pageTitle: "Administrator Sign up",
    path: "/admin/signup",
  });
};

exports.handleCreate = (req, res, next) => {
  console.log("password....", req.body.password);
  bcrypt
    .hash(req.body.password, 12)
    .then((encrypted) => {
      var agent = new Agent({
        email: req.body.username,
        password: encrypted,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      agent
        .save()
        .then((create) => {
          console.log("agent created successfully...");
        })
        .catch((exception) => {
          console.error("exception creating agent...", exception);
        });
    })
    .catch((encryptionFailed) => {
      console.error("encryption failed ...", encryptionFailed);
      next(encryptionFailed);
    });
};

exports.handleCreateProduct = (req, res, next) => {
  console.log(`bodys****${req.body.title}`);
  console.log(`bodys****${req.body.price}`);
  console.log(`bodys****${req.body.description}`);

  var product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl:req.body.imageUrl,
    color : ['red','blue','green'],
    shipping : {
              firstName : 'test',
              lastName : 'tester'
          
    }
     
  });

  product
    .save()
    .then((created) => {
      console.log("producted created through mongoose...");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("error while cretating product...", err);
      next(err);
    });
};


