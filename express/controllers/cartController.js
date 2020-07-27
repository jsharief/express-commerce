const orderManager = require('../manager/orderManager');
exports.addToCart = (req, res, next) => {
   
    orderManager.addToCart(req, res);
    //This returns the json response
    
    res.status(200).json({order: req.session.order});
};

exports.getShoppingCart = (req,res,next)=>{

    orderManager.getShoppingCart(req,res,next,(items)=>{
        res.render("cart", {
            pageTitle: "Your Cart",
            items: items,
            hasItems: items.length > 0,
            path: "/shop/cart",
            isLoggedIn: req.session.isLoggedIn,
          });
    });


};