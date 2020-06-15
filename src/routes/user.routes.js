const express = require('express');
const api = express.Router();
const uri = '/commands';
const userController = require('../controllers/user.controller');

api.post(uri,userController.commands);

module.exports = api;
