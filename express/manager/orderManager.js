//const Order = require('../models/order');
exports.addToCart = (req, res) => {
  console.log(" order from add to cart...");
  const Order = req.session.order;

  itemExist = preAddItemToOrder(Order.Items, 11123);

  if (!itemExist) {
    Order.Items.push({
      productid: 11123,
      qty: 1,
      unitPrice: 18.0,
      total: 18.0,
    });
  }
  Order.totalAmount = 18.0;
  Order.tax = 0.0;
  Order.shipping = 0.0;

  console.log(" order from add to cart...", Order);
  return Order;
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

      break;
    }

    return itemExist;
  }
};
