"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const { needsMiddleware } = require('../lib/command_verificator');
const key = "root";

exports.ensureAuth = (req, res, next) => {
  if (needsMiddleware(req)) {
    if (!req.headers.authorization) {
      return res.status(403).send({ message: "unauthorized request" });
    } else {
      var token = req.headers.authorization.replace(/["']+/g, "");
      try {
        var payload = jwt.decode(token, key);
        if (payload.exp <= moment().unix()) {
          return res.send({ message: "expired token" });
        }
      } catch (error) {
        console.log(error);
      }
      req.user = payload;
      next();
    }
  } else {
    next();
  }
};
