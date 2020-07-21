const Products = require("../models/product");
const fu = require("../util/fileUtil");
let Order = require('../models/order');
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { addTitle: "Add Product" }); //option-3 using Template
};

exports.postAddProduct = (req, res, next) => {
  console.log(`bodys****${req.body.title}`);
  console.log(`bodys****${req.body.price}`);
  console.log(`bodys****${req.body.description}`);

  product = new Products(req.body.title);
  product.price = req.body.price;
  product.description = req.body.description;
  product.id =
    (Math.random() * 100).toFixed() +
    new Date().getSeconds() +
    new Date().getMilliseconds();
  product.saveProduct();
  //  console.log("products ::::" + product);
  res.redirect("/shop/products");
};

exports.getProducts = (req, res, next) => {
  Products.fethAllProducts((biz) => {
    if (biz) {
      res.render("shop", {
        pageTitle: "Product Listing",
        products: biz,
        hasProducts: biz.length > 0,
        path: "/shop/products",
        isLoggedIn: req.session.isLoggedIn
      });
    }
  });
};

exports.getIndex = (req, res, next) => {

  order = new Order();
  if (req.session) {
    req.session.order = order;
  }

   Products.fethAllProducts((biz) => {
    if (biz) {
      res.render("index", {
        pageTitle: "Shop",
        products: biz,
        hasProducts: biz.length > 0,
        path: "/",
        isLoggedIn: req.session.isLoggedIn
      });
    }
  });
};

exports.getCart = (req, res, next) => {
  Products.fethAllProducts((biz) => {
    if (biz)
      res.render("cart", {
        pageTitle: "Your Cart",
        products: biz,
        hasProducts: biz.length > 0,
        path: "/shop/cart",
        isLoggedIn: req.session.isLoggedIn
      });
  });
};

exports.getCheckout = (req, res, next) => {
  Products.fethAllProducts((biz) => {
    if (biz)
      res.render("checkout", {
        pageTitle: "Checkout",
        products: biz,
        hasProducts: biz.length > 0,
        path: "/shop/checkout",
        isLoggedIn: req.session.isLoggedIn
      });
  });
};

exports.getOrders = (req, res, next) => {
  Products.fethAllProducts((biz) => {
    if (biz) {
      res.render("order", {
        pageTitle: "order",
        products: biz,
        hasProducts: biz.length > 0,
        path: "/shop/order",
        isLoggedIn: req.session.isLoggedIn
      });
    }
  });
};

exports.getProduct = (req, res, next) => {
  console.log(`Product id : ${req.params.productId}`);

  fu.findProductById(req.params.productId, (prod) => {
    res.render("productDetails", {

      pageTitle: `${prod.title}`,
      product: prod,
      hasProducts: prod.length > 0,
      path: "/shop/productDetails",
      isLoggedIn: req.session.isLoggedIn
    });
  });
};

exports.addToCart = (req, res, next) => {
  console.log(`Product id${req.body.productId}`);
  fu.findProductById(req.body.productId, (prod) => {
    res.render("cart", {
      pageTitle: "Your Cart",
      products: prod,
      hasProducts: prod.length > 0,
      path: "/shop/cart",
      isLoggedIn: req.session.isLoggedIn
    });
  });
};
