var express = require('express');
var router = express.Router();
var Controller = require('./Controllers/Bid/index');

/* GET bid by talent. */
router.get('/talents/:_id', function(req, res, next) {
	Controller.getByTalent(req, res, next);
});

/* GET bid by job. */
router.get('/jobs/:_id', function(req, res, next) {
	Controller.getByJob(req, res, next);
});

/* POST a new bid. */
router.post('/:jobId', function(req, res, next) {
  Controller.create(req, res, next);
});

/* PUT a bid. */
router.put('/:_id', function(req, res, next) {
  Controller.edit(req, res, next);
});


module.exports = router;
