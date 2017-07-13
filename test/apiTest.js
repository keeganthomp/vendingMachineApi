const vendingApp = require("../app");
const assert = require("assert");
const request = require("supertest");

describe("GET /api/customer/items", function() {
  it("should return data successfully", function(done) {
    request(vendingApp)
      .get("/api/customer/items") // returns a promise
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
      })
      .end(done);
  });
});

describe("GET /api/vending/money", function() {
  it("should return money amount successfully", function(done) {
    request(vendingApp)
      .get("/api/vending/money") // returns a promise
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
      })
      .end(done);
  });
});

describe("GET /api/vending/purchases", function() {
  it("should return purchase data successfully", function(done) {
    request(vendingApp)
      .get("/api/vending/purchases") // returns a promise
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
      })
      .end(done);
  });
});

describe("Update a vending machine record", function() {
  var newRecord;

  beforeEach("create new record", function(done) {
    request(vendingApp)
      .post("/api/vending/items") // returns a promise
      .send({ name: "dogs", cost: 5, quantity: 14 })
      .expect(function(res) {
        newRecord = res.body.savedItem;
      })
      .end(done);
  });

  afterEach("delete the record that was created", function(done) {
    request(vendingApp).delete(`/api/vending/items/${newRecord._id}`).end(done);
  });

  describe("POST /api/vending/items", function() {
    it("should post data successfully", function(done) {
      request(vendingApp)
        .post("/api/vending/items")
        .send({ name: "candybar", cost: 2, quantity: 23, purchased: false }) // returns a promise
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res) {
          assert.equal(res.body["status"], "success");
        })
        .end(done);
    });
  });

  describe("POST api/customer/items/:itemId/:moneyGiven", function() {
    it("should return the purchased item successfully", function(done) {
      request(vendingApp)
        .post(`/api/customer/items/${newRecord._id}/205`)
        .send() // returns a promise
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res) {
          assert.equal(res.body["status"], "success");
        })
        .end(done);
    });
  });

  describe("PUT /api/vending/items/:itemId", function() {
    it("should update item data successfully", function(done) {
      request(vendingApp)
        .put(`/api/vending/items/${newRecord._id}`)
        .send({ name: "cats", quantity: 32, cost: 10 }) // returns a promise
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res) {
          assert.equal(res.body["status"], "success");
        })
        .end(done);
    });
  });
});
