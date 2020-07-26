const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

var AgentSchema = new Schema({

    email :{
        type : String,
        required : true
     },

    password :{
        type : String,
        required : true
    },
    
    firstName : {
        type : String, 
        required : true,
    },

    lastName : {
      type: String, 
      required : true
    },

    registeredDate : {
        type : Date, 
        required : false,
        default:Date.now
    }

});

module.exports = mongoose.model('Agent', AgentSchema);