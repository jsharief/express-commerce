//const Order = require('../models/order');
const Product = require("../models/productSchema");
exports.addToCart = (req, res) => {
  Product.findById(req.body.productId)
    .then((product) => {
      const Order = req.session.order;
      const qty = 1;
      itemExist = preAddItemToOrder(Order.Items, req.body.productId);

      if (!itemExist) {
        var unitPrice = product.price;
        const total = Number(unitPrice) * Number(qty);

        Order.Items.push({
          productid: req.body.productId,
          productRef:product,
          qty: qty,
          unitPrice: unitPrice,
          total: total,
        });
      }

      postAddItemToOrder(Order);

      req.session.save();

      })
    .catch((exp) => {
      console.error("err", error);
    });

  //console.log(req.session.order);
};

const preAddItemToOrder = (items, productId) => {
  if (items.length > 0) {
    let itemExist = false;
    for (let item of items) {
      console.log("items in the array :", item);

      console.log("items in the productId :", item.productid);
      if (item.productid === productId) {
        itemExist = true;
        item.qty = item.qty + 1;
        item.total = item.qty * item.unitPrice;
      }
    }

    return itemExist;
  }
};

const postAddItemToOrder = (order) => {
  priceOrderTotal(order);
};

const priceOrderTotal = (order) => {
  let itemTotal = 0.0;
  if (order.Items) {
    for (let item of order.Items) {
      itemTotal += item.total;
    }
    order.total = itemTotal + order.shipping + order.tax;
  }
};
exports.getShoppingCart = (req, res, next, cb) => {
  if (req.session.order) {
    cb(req.session.order.Items);
  } else {
    cb(new Error("no order in session..."));
  }
};
