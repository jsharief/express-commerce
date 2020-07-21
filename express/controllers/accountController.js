const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
let Order = require("../models/order");
exports.getLogin = (req, res, next) => {
  let logger = req.session.isLoggedIn;
  res.render("login", {
    pageTitle: "Login",
    path: "/account/login",
    isLoggedIn: logger,
  });
};

exports.processLogin = (req, res, next) => {
  var email = req.body.username;
  var password = req.body.password;
  userModel
    .findOne({ where: { email: email} })
    .then((result) => {
      // project will be the first entry of the Projects table with the title 'aProject' || null
      if (result) {
        bcrypt.compare(password, result.password).then((validUser) => {
          if(validUser) {
            req.session.isLoggedIn = true;
            if(!req.session.order)
             {
               Order = new Order();
               req.session.order = Order;
             } else {
               Order = req.session.order;
             }
            console.log("from new Order ......" + Order);
            console.log("from session ......" + req.session.order);
            res.redirect("/");
          }
        }).catch(err=>{
            console.error('error while processing login ....',err);
        });
      } else {
        console.error("invalid user");
        res.redirect("/account/login");
      }
    })
    .catch((rr) => {
      console.error('error while query process login ....',err);
    });
};

exports.saveUser = () => {
  const user = {
    name: "Kabir",
    email: "kabir@khan.com",
    password: "trist",
  };
  const createUserModel = userModel.create(user);
};

exports.processLogout = (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("error destroying session", err.stack());
      } else {
        console.log("session destroyed...");
        res.redirect("/");
      }
    });
  }
};

exports.getSignUp = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Sign up",
    path: "/account/signup",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.processSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((result) => {
      if (result) {
        user = {
          email: username,
          password: result,
          name: "yograja",
        };

        userModel
          .create(user)
          .then((result) => {
            if (result) {
              console.log("user save success..");
              req.session.isLoggedIn = true;
              req.session.userid = result.id;
              req.session.email = result.email;
              
              Order = new Order();
              console.log("from new Order ......" + Order);
              req.session.order = Order;

              console.log("from session ......" + req.session.order);
              req.user = result;
              res.redirect("/");
            }
          })
          .catch((err) => {
            console.error("user save ..err check it", err);
            res.redirect("/");
          });
      }
    })
    .catch((err) => {
      if (err) {
        console.error("omser error ", err);
      }
    });

  // const conform = req.body.conform-password;
};

exports.validateEmail = (req, res, next) => {
  var email = req.query.email;
  userModel
    .findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(404).json({ message: "data not available" });
      }
    })
    .catch((err) => {
      if (err) {
        console.error("error exeuting the query ..", err);
        res.status(500).json({ message: "error" });
      }
    });
};
