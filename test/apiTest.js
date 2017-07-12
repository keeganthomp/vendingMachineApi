const vendingApp = require("../app");
const assert = require("assert");
const request = require("supertest");

describe("GET /api/items", function() {
  it("should return data successfully", function(done) {
    request(vendingApp)
      .get("/api/items") // returns a promise
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
      })
      .end(done);
  });
});

describe("GET /api/money", function() {
  it("should return money amount successfully", function(done) {
    request(vendingApp)
      .get("/api/money") // returns a promise
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
      })
      .end(done);
  });
});

describe("GET /api/purchases", function() {
  it("should return purchase data successfully", function(done) {
    request(vendingApp)
      .get("/api/purchases") // returns a promise
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
      .post("/api/items") // returns a promise
      .send({ item: "dogs", cost: 5, quantity: 14 })
      .expect(function(res) {
        newRecord = res.body.savedItem;
      })
      .end(done);
  });

  afterEach("delete the record that was created", function(done) {
    request(vendingApp).delete(`/api/vendor/items/${newRecord._id}`).end(done);
  });

  describe("POST /api/items", function() {
    it("should post data successfully", function(done) {
      request(vendingApp)
        .post("/api/items")
        .send({ name: "candybar", cost: 2, quantity: 23, purchased: false }) // returns a promise
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res) {
          assert.equal(res.body["status"], "success");
        })
        .end(done);
    });
  });

  describe("POST /customer/items/:itemId/:moneyGiven", function() {
    it("should return the purchased item successfully", function(done) {
      request(vendingApp)
        .post(`/api/customer/${newRecord._id}/purchases`)
        .send() // returns a promise
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res) {
          assert.equal(res.body["status"], "success");
        })
        .end(done);
    });
  });
});
