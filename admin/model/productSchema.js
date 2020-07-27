const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

var ProductSchema = new Schema({
     title : {
         type : String,
         required : true
     },
     price : {
         type : Number,
         required : true
     },
     description : {
        type : String,
        required : true
     },
     imageUrl : {
        type : String   ,
        required : true
     },
     createdAt : {
        type : Date,
        required:false,
        default:Date.now
     },
     isActive : {
         type : Boolean,
         default:true
     }
  });


  // Getter
  ProductSchema.path('price').get(function(num) {
   return (num / 100).toFixed(2);
 });
 
 // Setter
 ProductSchema.path('price').set(function(num) {
   return num * 100;
 });

  module.exports = mongoose.model('Product', ProductSchema);