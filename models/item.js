var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var vendingSchema = new Schema({
  money: Number,
  name: String,
  cost: Number,
  quantity: Number,
  purchased: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Vending", vendingSchema);
