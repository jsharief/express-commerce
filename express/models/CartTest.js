const Items = require("./order-Items");
const Order = require("./order");
let cart = new Items();
    cart.productId = '1123';
    cart.qty = 2;
    cart.amount = 12.00;
let cart2 = new Items();

cart2.productId = '1123';
cart2.qty = 3;
cart2.amount = 124.00;

let cart1 = new Items();
let cart3 = new Items();
let cartItems = [ {
    cart,cart2,cart1,cart3
}];

priceCartItems = (itemsArray) => {
    for (Item of itemsArray) {
       Item.cart2.total  =  Item.cart2.qty * Item.cart2.amount;
        console.log(Item);
      //  console.log(Item.amount);
    }
}


const order = new Order();
console.log(order);
console.log(priceCartItems(cartItems));
