var express = require('express'),
	router = express.Router(),
	Controller = require('./Controllers/Client/index');

/* GET all client */
router.get('/', function(req, res, next) {
	Controller.getAll(req, res, next);
});

/* GET a client */
router.get('/:_id', function(req, res, next) {
	Controller.getById(req, res, next);
});

module.exports = router;
