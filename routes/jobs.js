var express = require('express');
var router = express.Router();
var Controller = require('./controllers/Job/index');

/* GET all jobs. */
router.get('/', function(req, res, next) {
  Controller.getAll(req, res, next);
});

/* GET job by id. */
router.get('/:_id', function(req, res, next) {
  Controller.getById(req, res, next);
});

/* GET jobs by client */
router.get('/clients/:_id', function(req, res, next) {
  Controller.getByClient(req, res, next);
});

/* POST a job */
router.post('/', function(req, res, next) {
	Controller.create(req, res, next);
});

/* PUT a job. */
router.put('/:_id', function(req, res, next) {
  Controller.edit(req, res, next);
});

module.exports = router;
