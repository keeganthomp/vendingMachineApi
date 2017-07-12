var express = require("express");
var router = express.Router();
var Item = require("../models/item");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/items/:itemId/purchases", (req, res) => {
  console.log(req.params.itemId);
  var itemData = Item.findOne({
    refNum: req.params.itemId
  }).then(purchasedItem => {
    res.send({"You Purchased": purchasedItem});
  });
});

module.exports = router;
