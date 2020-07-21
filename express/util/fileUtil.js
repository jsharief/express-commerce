const path = require("path");
const fs = require("fs");
const Product = require("../models/product");
const { stringify } = require("querystring");
//const { cpuUsage } = require("process");
const products = [];

const rootDir = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "prod.json"
);

exports.fetchAllProducts = (cb) => {
  fs.readFile(rootDir, (err, data) => {
    if (err) {
      console.error(
        "Error reading a file hence returning an empty array",
        err.stack
      );
      return cb([]);
    } else {
      return cb(JSON.parse(data));
    }
  });
};

exports.save = (products) => {
  console.log("rootDir", rootDir);
  fs.readFile(rootDir, (err, data) => {
    if (err) {
      console.error("Error reading a file hence writing the file", err.stack);
      fs.writeFile(rootDir, JSON.stringify(products), (err) => {
        if (err) {
          console.error("Error writing a file", err.stack);
        }
      });
    } else {
      let fileData = JSON.parse(data);
      let combinedData = [...fileData, ...products];
      fs.writeFile(rootDir, JSON.stringify(combinedData), (err) => {
        if (err) {
          console.error("Error writing a file", err.stack);
        }
      });
    }
  });
};

exports.findProductById = (prodId, cb) => {
  console.log("Hello inside Product By Id..." + prodId);
  console.log("Hello inside Product By Id..." + rootDir);
  let products = [];
  let prodNotFound = false;
  fs.readFile(rootDir, (err, data) => {
    if (!err) {
      products = JSON.parse(data);

      for (let product of products) { 
        if (prodId == product.id) {
          prodNotFound = true;
          console.log(`product found , ${product}`);
          return cb(product);
        }
      }
      if (!prodNotFound) {
        console.warn("Product is not available ... Check the code...");
      }
    } else {
      console.error(err.stack);
    }
  });
};

exports.addToCart = (cart, callback) => {
  cart = [
    {
      id: 100001,
      productId: 111230,
      quantity: 2,
      price: 100,
      total: 200,
    },
    {
      id: 100002,
      productId: 111130,
      quantity: 2,
      price: 100,
      total: 200,
    },
  ];

  
  fs.readFile("cart.json",(err,data)=>{
      if(!err) {
          cart = JSON.parse(data);
          
          for (let item of cart) {
             if (item.productId == productId) {
               
             }
          }
      }

  });


  fs.exists("cart.json",(exists)=>{

    if(exists) {

    }

  })
  
  fs.writeFile("cart.json", JSON, stringify(cart));
};
