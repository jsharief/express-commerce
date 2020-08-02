const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
var  shipppingGroup = new Schema({

        sg_state : {
            type : String,
            default : 'INITIAL'
        },
        method : {
            type : String,
            default : 'ground'
        },

        firstName : {
            type : String
        },
        lastName : {
            type : String,
        },
        addressLine1 : {
            type : String
        },
        addressLine2 : {
            type : String
        },
        city  : {
            type : String
        },

        state  : {
            type : String
        },
        country : {
            type : String
        }
});

module.exports = shipppingGroup;