const Agent = require('../model/agentSchema');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render("admin/login", {
    pageTitle: "Administrator Login",
    path: "/admin/login",
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};


exports.getSignUp= (req, res, next) => {
  console.log('...Sign up....');
  res.render("admin/signup", {
    pageTitle: "Administrator Sign up",
    path: "/admin/signup",
  });
};

exports.handleCreate = (req,res,next)=>{

  console.log("password....",req.body.password);
  bcrypt.hash(req.body.password,12).then(encrypted =>{

    var  agent = new Agent(
      {
         email : req.body.username,
         password : encrypted,
         firstName : req.body.firstName,
         lastName : req.body.lastName
      });
 
      agent.save().then(create =>{
         console.log('agent created successfully...');
      }).catch(exception=>{
         console.error('exception creating agent...',exception);
      });

  }).catch(encryptionFailed => {
    console.error('encryption failed ...',encryptionFailed);
    next(encryptionFailed);
  })
  

   

};
