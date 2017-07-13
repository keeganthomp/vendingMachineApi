var express = require("express");
var router = express.Router();
var Item = require("../models/item");

router.get("/customer/items", (req, res) => {
  Item.find().then(allItems => {
    res.send({ status: "success", allItems });
  });
});

router.get("/vending/purchases", (req, res) => {
  Item.find({purchased: true}).then(purchasedItems => {
    res.send({ status: "success", purchasedItems });
  });
});

router.post("/vending/items", (req, res) => {
  var newItemData = req.body;
  var newItem = new Item(newItemData);
  newItem
    .save()
    .then(savedItem => {
      res.send({ status: "success", savedItem });
    })
    .catch(err => {
      res.send(err);
    });
});

router.put("/vending/items/:itemId", (req, res) => {
  Item.updateOne({ _id: req.params.id }, req.body).then(updatedItem => {
    res.send({status: "success", updatedItem});
  });
});

router.get("/vending/money", (req, res) => {
  Item.find().then(foundMoney => {
    res.send({
      totalMoney: foundMoney,
      status: "success"
    });
  });
});




router.post("/customer/items/:itemId/:moneyGiven", (req, res) => {
  var purchasedItemId = req.params.itemId;
  var customerMoney = req.params.moneyGiven;
  var purchasedItem = Item.findOne({
    _id: purchasedItemId
  }).then(purchasedItem => {
    if (purchasedItem.cost < customerMoney) {
      purchasedItem.purchased = true;
      purchasedItem.save()
      res.send({
        "Congrats, You Purchased a": purchasedItem.name,
        status: "success",
        yourchange: customerMoney - purchasedItem.cost
      });
    }
  });
});

module.exports = router;
