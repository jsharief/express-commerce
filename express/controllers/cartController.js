const orderManager = require('../manager/orderManager');
exports.addToCart = (req, res, next) => {
    console.log('Here is in the cart controller.... ');
    let order = orderManager.addToCart(req, res);
    res.status(200).json({order:order});
};
  