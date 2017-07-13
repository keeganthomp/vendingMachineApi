var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var vendingMachineSchema = new Schema({
  money: {
      type: Number,
      default: 500
  }
});

module.exports = mongoose.model("VendingMachine", vendingMachineSchema);