var express = require('express');
var router = express.Router();
var Controller = require('./Controllers/Review/index');

/* GET reviews by user. */
router.get('/:_id', function(req, res, next) {
  Controller.getByUser(req, res, next);
});

/* POST a review for a client. */
router.post('/clients', function(req, res, next) {
  Controller.checkIfPosted(req, res, next);
}, 
	function(req, res, next) {
		Controller.checkContractStatus(req, res, next);
	},
	function(req, res, next) {
		Controller.newForClient(req, res, next);
	});

/* POST a review for a talent. */
router.post('/talents', function(req, res, next) {
  Controller.checkIfPosted(req, res, next);
}, 
	function(req, res, next) {
		Controller.checkContractStatus(req, res, next);
	},
	function(req, res, next) {
		Controller.newForTalent(req, res, next);
	});

/* PUT a review. */
router.put('/:_id', function(req, res, next) {
  Controller.edit(req, res, next);
});

/* DELETE a review. */
router.delete('/:_id', function(req, res, next) {
  Controller.delete(req, res, next);
});

module.exports = router;
