"use strict";

if (process.env.NODE_ENV === "production") {
  //process.env.MONGODB_URI is coming from deployed server (heroku)
  module.exports = {
    mongoURI: process.env.MONGODB_URI
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/biggie-dev"
  };
}
