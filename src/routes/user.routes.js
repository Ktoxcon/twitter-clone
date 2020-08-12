const express = require("express");
const api = express.Router();
const commandController = require("../controllers/command.controller");
const autentication = require("../middleware/autentication");

api.post("/commands", autentication.ensureAuth, commandController.commands);

module.exports = api;
