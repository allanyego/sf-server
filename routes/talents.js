var express = require('express');
var router = express.Router();

var Controller = require('./Controllers/Talent/index');

/* GET all talents. */
router.get('/', function(req, res, next) {
  Controller.getAll(req, res, next);
});

/* GET a talent by ID */
router.get('/:_id', function(req, res, next) {
	Controller.getById(req, res, next);
});

module.exports = router;
