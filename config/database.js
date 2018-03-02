"use strict";
const prodUsername = process.env.PROD_USERNAME;
const prodPassword = process.env.PROD_PASSWORD;
const prodHost = process.env.PROD_HOST;
const prodDb = process.env.PROD_DB;

const prodConnectString = `mongodb://${prodUsername}:${prodPassword}@${prodHost}/${prodDb}`;

if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: prodConnectString
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/biggie-dev"
  };
}
