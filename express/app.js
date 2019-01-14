const express = require('express');
const controllers = require('./mvc/controller');
const middleware = require('./mvc/middleware');
const config = require('config');
const HttpStatus = require('http-status-codes');

module.exports = appInsights => express.Router()

  // load payment types
  .get('/home', controllers.homeScreenController.getHomePage)

  .get('/monitoring-tools', (req, res) => res.status(HttpStatus.OK).json({ key: config.get('appInsights.instrumentationKey') }));
