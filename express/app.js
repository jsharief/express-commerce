const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Sequelize = require("sequelize");
const htmlfilePath = require("./util/path").viewPath;
const staticPath = require("./util/path").staticPath;
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const accountRoutes = require("./routes/account");
const productRoutes = require("./routes/productDetail");
const productController = require("./controllers/productsController");
const accountController = require("./controllers/accountController");
const cartController = require("./controllers/cartController");
const session = require("express-session");
const connectMongo = require("./dao/database");
const mongoose = require("./dao/dataSource");
var MongoDBStore = require("connect-mongodb-session")(session);
const userModel = require("./models/user");

const sequelize = require("./util/dataSource");

const nodemon = require("nodemon");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
//parse the body ....

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//public folder access
app.use(express.static(path.join(__dirname, "public")));


//app.use("/shop",productRoutes);
const MONGODB_URI =
  "mongodb+srv://sharief:Login123$@cluster0.mzumy.mongodb.net/Test?retryWrites=true&w=majority&useUnifiedTopology=true";

var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "mySessions",
});

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 week
    },
    store: store,
  })
);

app.use("/admin", adminRoutes.routes);

app.use("/shop", shopRoutes);

app.use("/account", accountRoutes);

app.get("/", productController.getIndex);

app.get("/onPageLoad",cartController.handlePageLoad);

// To handle invalid request
/*app.use((req, res, next) => {
  let filePath = htmlfilePath("views", "404.html");
  res.status(404).sendFile(filePath, (err) => {
    if (err) {
      if (err) {
        console.log("file not able send");
      } else {
        console.log("file sent");
      }
    }
  });
});*/

/*app.use((req, res, next) => {
  let htmlStrin = 'tet';
  res.status(404).render('404', { pageTitle: 'Page Not Found' },(err,htmlStrin)=>{
     if(err) {
       console.error('errs',err.stack)
     }

     let constring = htmlStrin.concat('<h1>Helll000000000000</h1>');
      res.end(constring);
      console.log(`htmlString,${constring}`);
    });


    
});*/

app.use((req, res, next) => {
  let logger = req.session.isLoggedIn;
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/",
    isLoggedIn: logger,
  });
});

//pp.disable('ETag');

//accountController.saveUser();

//console.log(process.env);

/*connectMongo.mongoConnect((mongoConnection) => {
  if (mongoConnection) {
    console.log("Mongo Connected... Server will be started listerning @ 3000");
    app.listen(process.env.PORT);

    console.log(`Server started listerning @${process.env.PORT}` );
  }
});*/

mongoose
  .dataSource()
  .then((connected) => {
    if (connected) {
      console.log(
        "Mongo Connected... Server will be started listerning @ 3000"
      );

      const port = process.env.PORT || 3000;
      app.listen(port);

      console.log(`Server started listerning @${port}`);
    }
  })
  .catch((connectionExcepton) => {
    console.error("exception connecting mong", connectionExcepton);
    //next(connectionExcepton);
  });
