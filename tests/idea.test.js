const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");

const { app } = require("../app");
const { Idea } = require("../models/Idea");

chai.use(chaiHttp);

describe("Ideas", () => {
  beforeEach(done => {
    Idea.remove({}, err => {
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
    it("should GET all the ideas even with INCORRECT route", done => {
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
          done();
        });
    });
    it("should not POST idea", done => {
      let ideaData = {
        topic: "",
        details: "my details"
      };
      chai
        .request(app)
        .post("/ideas")
        .send(ideaData)
        .end((err, res) => {
          res.should.have.status(206);
          done();
        });
    });
    // afterEach(done => {
    //   Idea.remove({}, err => {
    //     done();
    //   });
    // });
  });
});
