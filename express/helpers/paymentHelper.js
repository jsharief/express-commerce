const stripe = require("stripe")(
  "sk_test_51HA5hEFn9ku0qcLPLBzdEtXb3036AGMbnN6TDBBbQUFig3dwSHt2b8xSoYGLjRYdVtM5lk4uTbac90Xwv5Q2TBHJ00QUwSNPxD"
);
//console.log(stripe);

exports.createStripeSession =  (req, res, next) => {
  var order = req.session.order;
  var items = order.Items;

    stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((p) => {
      return (
        "price_data :" +
        {
          currency: "usd",

          product_data: {
            name: p.productRef.title,
          },

          unit_amount: p.unitPrice * 100,
        }
      );
    }),
    mode: "payment",
    success_url:
      req.protocol +
      "://" +
      req.get("host") +
      "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: req.protocol + "://" + req.get("host") + "/checkout/success",
  });
};
