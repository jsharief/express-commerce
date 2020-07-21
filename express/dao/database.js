const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let url =
  
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then((connection) => {
      console.log("Connected to Mongo...");
      _db = connection.db();
      callback(connection.db());
      // return connection.db();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getDb = () => {
  return _db;
};

let product = {
  name: "Hamam Neem Soap",
  _id: 11123,
  price: 25.0,
  tags: ["neem", "nature", "ayush"],
  retailers: [
    {
      name: "Arjun Rao",
      store: "Durga Patil Store",
    },
    {
      name: "Narasima sheety",
      store: "VinayakaStore",
    },
  ],
};

/*mongoConnect((result)=>{
    
   if(result) {

    let db  = result.db();
    db.collection('Product').insertOne(product).then(collecrestionResult => {
        console.log('inserted ..');
       //db.logout();
    }).catch(error => {
        console.log(error);
    });
   }
});*/

/*mongoConnect((result)=>{

   let db = result.db();
   let collection = db.collection('Product');

   let productQuery = {_id : 11123};
   
   //collection.replaceOne(productQuery,product).then(res =>{
   collection.UpdateOne(productQuery,product).then(res =>{
      console.log('replaced Galaballll')
   }).catch(err=>{
      console.log('err Galaballll')
   });

});*/

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
