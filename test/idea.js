require("../models/Idea");
const mongoose = require("mongoose");
const Idea = mongoose.model("Idea");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Ideas", () => {
  beforeEach(done => {
    Idea.remove({ topic: "biggie testing token-POST" }, err => {
      done();
    });
  });
  describe("GET /", () => {
    it("should GET all the ideas with / root route", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should GET all the ideas with /ideas", done => {
      chai
        .request(app)
        .get("/ideas")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should GET all the ideas with INCORRECT route", done => {
      chai
        .request(app)
        .get("/ideas-bad-route")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("POST /", () => {
    it("should POST idea", done => {
      let ideaData = {
        topic: "biggie testing token-POST",
        details: "my details"
      };
      chai
        .request(app)
        .post("/ideas")
        .send(ideaData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.not.have.property("errors");
          done();
        });
    });
    afterEach(done => {
      Idea.remove({ topic: "biggie testing token-POST" }, err => {
        done();
      });
    });
  });
});
