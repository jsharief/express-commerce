const fsUtils = require('../util/fileUtil');
const products = [];
module.exports = class Product {
  title;
  price;
  description;
  imgurl;
  img =
    "https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png";
   
   id ;
  constructor(t) {
    this.title = t;
    console.log("product titile :", this.title);
  }

  saveProduct() {
    console.log("saving Product***", products);
    products.push(this);
    fsUtils.save(products);
    console.log("after saving Product***", products);
  };

  
  static fethAllProducts(cb) {
    console.log("fetch all products ==> ", products);
    console.log("call back fns  ==> ", cb);
    return fsUtils.fetchAllProducts(cb);
  }
};
 
 