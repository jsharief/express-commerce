//const Order = require('../models/order');
const Product = require("../models/productSchema");
const Order = require("../models/orderSchema");
exports.addToCart = (req, res) => {
  return Product.findById(req.body.productId);
};

exports.preAddItemToOrder = (items, productId) => {
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

exports.postAddItemToOrder = (order) => {
  priceOrderTotal(order);
};

priceOrderTotal = (order) => {
  let itemTotal = 0.0;
  if (order.Items) {
    for (let item of order.Items) {
      item.total = item.qty * item.unitPrice;
      itemTotal += item.total;
      console.log("ItemTotal...." + itemTotal);
    }
    order.itemTotal = Number(itemTotal);
    order.total =
      Number(itemTotal) + Number(order.shipping) + Number(order.tax);
  }
};
exports.getShoppingCart = (req, res, next, cb) => {
  if (req.session.order) {
    cb(req.session.order);
  } else {
    cb(new Error("no order in session..."));
  }
};

exports.calcuateShipping = (req, res, next) => {
  if (req.session.order) {
    var order = req.session.order;
    let shippingMethod = req.params.method;
    if (shippingMethod === "ground") {
      order.shipping = 5;
      order.shipppingGroup.method = "ground";
      priceOrderTotal(order);
    } else if (shippingMethod === "2Day") {
      order.shipping = 20;
      order.shipppingGroup.method = "2Day";
      priceOrderTotal(order);
    } else if (shippingMethod === "Nday") {
      order.shipping = 30;
      order.shipppingGroup.method = "Nday";
      priceOrderTotal(order);
    }
  }
};

exports.getProductMap = (order, cb) => {
  cb(order.Items.map((p) => {
    return {
      name: p.productRef.title,
      description: p.productRef.description,
      amount: p.unitPrice * 100,
      currency: "usd",
      quantity: p.qty,
    };
  }));
};

exports.commitOrder = (order)=>{
   order.state = 'SUBMITTED';
   var mongooseOrder = new Order(order);
   return mongooseOrder.save();
}