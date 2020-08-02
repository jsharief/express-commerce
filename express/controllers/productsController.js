const Products = require("../models/product");
const Product = require("../models/productSchema");
const fu = require("../util/fileUtil");
let Order = require("../models/order");
const orderManager = require("../manager/orderManager");
const productHelper = require("../helpers/productHelper");
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { addTitle: "Add Product" }); //option-3 using Template
};

exports.postAddProduct = (req, res, next) => {
  console.log(`bodys****${req.body.title}`);
  console.log(`bodys****${req.body.price}`);
  console.log(`bodys****${req.body.description}`);

  var product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
  });

  product
    .save()
    .then((created) => {
      console.log("producted created through mongoose...");
      res.redirect("/shop/products");
    })
    .catch((err) => {
      console.error("error while cretating product...", err);
    });
};

exports.getProducts = (req, res, next) => {
  /* Products.fethAllProducts((biz) => {
    if (biz) {
      res.render("shop", {
        pageTitle: "Product Listing",
        products: biz,
        hasProducts: biz.length > 0,
        path: "/shop/products",
        isLoggedIn: req.session.isLoggedIn,
      });
    }
  });*/

  productHelper
    .fetchAllProducts()
    .then((fetchedProducts) => {
      res.render("shop", {
        pageTitle: "Product Listing",
        products: fetchedProducts,
        hasProducts: true,
        path: "/shop/products",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((exception) => {
      console.error("product fetching exception", exception);
      next(exception);
    });
};

exports.getIndex = (req, res, next) => {
  res.render(
    "index",
    {
      pageTitle: "Shop",
      hasProducts: false,
      path: "/",
      isLoggedIn: req.session.isLoggedIn,
    },
    (error, html) => {
      if (html) {
        if (req.session) {
          if (!req.session.order) {
            console.log("session available  no order available...");
            order = new Order();
            req.session.order = order;
          } else {
            console.log("order session available in order...", req.session);
          }
        }
        res.send(html);
      }
    }
  );
};

exports.getCart = (req, res, next) => {
  orderManager.getShoppingCart(req, res, next, (order) => {
    if (order) {
      var ground;
      var day2;
      var nday;

       if(order.shipppingGroup.method === 'ground') {
         ground = 'checked';
       }else if(order.shipppingGroup.method === '2Day'){
          day2 = 'checked';
       }else if(order.shipppingGroup.method === 'Nday'){
          nday = 'checked';
       }
      console.log("items ==> ", order);
      console.log("items ==> ", order.Items.length);

      res.render("cart", {
        pageTitle: "Your Cart",
        cartItems: order.Items,
        hasItems: order.Items.length > 0,
        order: order,
        path: "/shop/cart",
        isLoggedIn: req.session.isLoggedIn,
        ground:ground,
        day2:day2,
        nday:nday,
      });
    }
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
        isLoggedIn: req.session.isLoggedIn,
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
        isLoggedIn: req.session.isLoggedIn,
      });
    }
  });
};

exports.getProduct = (req, res, next) => {
  console.log(`Product id : ${req.params.productId}`);
  productHelper
    .fetchProductById(req.params.productId)
    .then((productExist) => {
      res.render("productDetails", {
        pageTitle: `${productExist.title}`,
        product: productExist,
        hasProducts: true,
        path: "/shop/productDetails",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((productFindException) => {
      console.error("product fetch exception ", productFindException);
    });

  /*fu.findProductById(req.params.productId, (prod) => {
    res.render("productDetails", {
      pageTitle: `${prod.title}`,
      product: prod,
      hasProducts: prod.length > 0,
      path: "/shop/productDetails",
      isLoggedIn: req.session.isLoggedIn,
    });
  });*/
};

exports.addToCart = (req, res, next) => {
  console.log(`Product id${req.body.productId}`);
  fu.findProductById(req.body.productId, (prod) => {
    res.render("cart", {
      pageTitle: "Your Cart",
      products: prod,
      hasProducts: prod.length > 0,
      path: "/shop/cart",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};
