require("../models/Idea");
const mongoose = require("mongoose");
const Idea = mongoose.model("Idea");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Ideas", () => {
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
});
