var express = require('express'),
	router = express.Router(),
	Controller = require('./Controllers/User/index');


/* POST a user */
router.post('/', function(req, res, next) {
	Controller.create(req, res, next);
});

/* Authenticate user */
router.get('/auth', function(req, res, next) {
	res.json({
		status: 'success',
		result: 'Authenticated.'
	});
	// Controller.authenticate(req, res, next);
});

/* PUT a user */
router.put('/:_id', function(req, res, next) {
	Controller.edit(req, res, next);
});

module.exports = router;
