const orderManager = require("../manager/orderManager");
const paymentHelper = require("../helpers/paymentHelper");
const Order = require("../models/order");
const stripe = require("stripe")(
  "sk_test_51HA5hEFn9ku0qcLPLBzdEtXb3036AGMbnN6TDBBbQUFig3dwSHt2b8xSoYGLjRYdVtM5lk4uTbac90Xwv5Q2TBHJ00QUwSNPxD"
);

exports.handleCalculateShipping = (req, res, next) => {
  orderManager.calcuateShipping(req, res, next);
  res.status(200).json({ message: "success" });
};

exports.handleStripePayment = (req, res, next) => {
  var order = req.session.order;
  var items = order.Items;

  const session = stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: items.map((p) => {
        return {
          name: p.productRef.title,
          description: p.productRef.description,
          amount: order.total,
          currency: "usd",
          quantity: p.qty,
        };
      }),
      mode: "payment",
      customer_email: "customer@express-shop.com",
      success_url:
        req.protocol +
        "://" +
        req.get("host") +
        "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: req.protocol + "://" + req.get("host") + "/checkout/success",
    })
    .then((session) => {
      console.log("=====>" + session.id + "<=====");
      res.render("payment", {
        path: "/payment",
        pageTitle: "payment",
        order: order,
        sessionId: session.id,
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("exception", error);
      next(error);
    });
};

exports.handlePaymentSuccess = (req, res, next) => {
  var order = req.session.order;
  if (order) {
    orderManager
      .commitOrder(order)
      .then((orderSaved) => {
        req.session.order = new Order();
        req.session.lastOrder = orderSaved;
        res.redirect("/shop/orderConfirmation");
      })
      .catch((exception) => {
        console.error("exception occurred ...", exception);
        next(exception);
      });
  }
};

exports.handleConfirmOrder = (req,res,next) => {
  var orderSaved = req.session.lastOrder ;
  console.log(orderSaved +"save order..." + orderSaved._id);
  res.render("confirm",{
    pageTitle: 'confirmOrder',
    order: orderSaved,
    path: '/checkout/confirm',
    isLoggedIn: req.session.isLoggedIn
  })
}
