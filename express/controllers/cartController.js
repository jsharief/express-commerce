const orderManager = require("../manager/orderManager");
const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51HA5hEFn9ku0qcLPLBzdEtXb3036AGMbnN6TDBBbQUFig3dwSHt2b8xSoYGLjRYdVtM5lk4uTbac90Xwv5Q2TBHJ00QUwSNPxD"
);
exports.addToCart = (req, res, next) => {
  console.log("cart Controller ...", req.body);
  orderManager
    .addToCart(req, res)
    .then((product) => {
      const Order = req.session.order;
      const qty = 1;
      var unitPrice = product.price;
      itemExist = orderManager.preAddItemToOrder(
        Order.Items,
        req.body.productId
      );

      if (!itemExist) {
        const total = Number(unitPrice) * Number(qty);

        Order.Items.push({
          productid: req.body.productId,
          productRef: product,
          qty: qty,
          unitPrice: unitPrice,
          total: total,
        });
      }

      orderManager.postAddItemToOrder(Order);
      var cartResponse = orderManager.getAddToCartResponse(Order);
      res.status(200).json(cartResponse);
    })
    .catch((exp) => {
      console.error("err", exp);
    });
  //This returns the json response
};

exports.getShoppingCart = (req, res, next) => {
  orderManager.getShoppingCart(req, res, next, (items) => {
    res.render("cart", {
      pageTitle: "Your Cart",
      items: items,
      hasItems: items.length > 0,
      path: "/shop/cart",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.deleteCartItem = (req, res, next) => {
  if (req.session.order) {
    let order = req.session.order;
    let itemId = req.params.itemId;
    let items = order.Items;
    if (items.length > 0) {
      items.find((item, i) => {
        if (item.productid === itemId) {
          items.splice(i, 1);
          orderManager.postAddItemToOrder(order);
          return res.status(200).json({ message: "success" });
        }
      });
    }
  }
};

exports.handleCheckout = (req, res, next) => {
  if (req.session.order) {
    var order = req.session.order;
    var items = order.Items;
    var ground;
    var day2;
    var nday;

    if (order.shipppingGroup.method === "ground") {
      ground = "checked";
    } else if (order.shipppingGroup.method === "2Day") {
      day2 = "checked";
    } else if (order.shipppingGroup.method === "Nday") {
      nday = "checked";
    }

    var pmap;
    orderManager.getProductMap(order, (map) => {
      map.push({
        name: "shipping",
        description: "shipping price",
        amount: order.shipping * 100,
        currency: "usd",
        quantity: 1,
      });
      pmap = map;
    });

    const session = stripe.checkout.sessions
      .create({
        payment_method_types: ["card"],
        line_items: pmap,
        mode: "payment",
        customer_email: "customer@express-shop.com",
        success_url:
          req.protocol +
          "://" +
          req.get("host") +
          "/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url:
          req.protocol + "://" + req.get("host") + "/checkout/success",
      })
      .then((session) => {
        if (items && items.length > 0) {
          res.render("shipping", {
            pageTitle: "Your Shipping",
            cartItems: items,
            hasItems: items.length > 0,
            order: order,
            path: "/shop/checkout",
            isLoggedIn: req.session.isLoggedIn,
            ground: ground,
            day2: day2,
            nday: nday,
            sessionId: session.id,
          });
        } else {
          res.redirect("/");
        }
      })
      .catch((exception) => {
        console.error("exception occurred", exception);
      });
  }
};

exports.handlePageLoad = (req,res,next) => {
  var order = req.session.order;
  if(order) {
    cartResponse =  orderManager.getAddToCartResponse(order);

  } else {
    
    cartResponse = {
        qty : 0,
        total : 0.00
    }
  }
  res.status(200).json(cartResponse);
};