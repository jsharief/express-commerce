const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
var Shippng = new Schema({
    firstName : {
       type : String
    },
    lastName : {
        type : String
    }
 });

 module.exports = Shippng;