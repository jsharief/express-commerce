const Cart = require('./cart');
product = [ {
    id : 1,name : 'brown bag' ,des : 'brown color bag'
}];


another = [{
  id : 2,name : 'black bag' ,des : 'black color bag'
}];


let temp =[...another,...product];

let numeric  = Math.random()*100;

let sec = new Date().getSeconds();
let mssec = new Date().getMilliseconds();

//console.log(numeric.toFixed()+sec+mssec);

let shopCart  = new Cart();
shopCart.addItemToCart(11123);
shopCart.addItemToCart(111234);
shopCart.addItemToCart(12345454);
console.log(shopCart.cart.products);
console.log(shopCart.cart.totalPrice);

//console.log(temp);