const Product = require('../models/productSchema');
exports.fetchAllProducts=()=>{
    return Product.find();
};

exports.fetchProductById=(productId)=>{
    return Product.findById(productId);
};