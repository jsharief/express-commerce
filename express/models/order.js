
//const Items = require("./order-Items");

module.exports = class Order {

    constructor() {

    }

    Items = [] ;
    total = 0.00;
    shipping= 5.00;
    tax =0.00;
    itemTotal=0.00;
    state='INCOMPLETE';
    shipppingGroup = {
       method : 'ground' ,
       
    }

}
