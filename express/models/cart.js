module.exports = class Cart {
  constructor() {}

  cart = { products: [], totalPrice: 0 };

  addItemToCart(productId) {
   
    this.cart.products.push( {
        id : productId,
        qty: 1,
        price: 12.00
    });


    for ( let product of this.cart.products) {
        this.cart.totalPrice += this.cart.totalPrice+ product.price;
    }

  }
};
