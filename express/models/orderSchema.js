const mongoose = require("mongoose");
const shippingGroup = require("./shippingSchema");
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
  state: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
  },
  Items: {
    type: Array,
    required: true,
  },

  itemTotal: {
    type: Number,
  },

  total: {
    type: Number,
  },

  shipping: {
    type: Number,
  },
  tax: {
    type: Number,
  },

  shipppingGroup: {
    type: shippingGroup,
  },
});

/*// Getter
ProductSchema.path("price").get(function (num) {
  return (num / 100).toFixed(2);
});

// Setter
ProductSchema.path("price").set(function (num) {
  return num * 100;
});*/

module.exports = mongoose.model("Order", OrderSchema);
