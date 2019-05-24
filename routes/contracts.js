var express = require('express');
var router = express.Router();
var Controller = require('./controllers/Contracts/index');

/* GET by talent. */
router.get('/talents/:_id', function(req, res, next) {
	Controller.getByTalent(req, res, next);
});

/* GET by client. */
router.get('/clients/:_id', function(req, res, next) {
	Controller.getByClient(req, res, next);
});

/* POST a contract. */
router.post('/', function(req, res, next) {
	Controller.create(req, res, next);
});

/* PUT a contract */
router.put('/:_id', function(req, res, next) {
	Controller.edit(req, res, next);
});


module.exports = router;