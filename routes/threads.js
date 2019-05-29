var express = require('express');
var router = express.Router();

var Controller = require('./Controllers/Thread/index');

/* GET threads by user. */
router.get('/:_id', function(req, res, next) {
	Controller.getByUser(req, res, next);
});

/* POST a new thread. */
router.post('/', function(req, res, next) {
	Controller.create(req, res, next);
});

/* POST a new message. */
router.post('/messages', function(req, res, next) {
	Controller.addMessage(req, res, next);
});

/* PUT a thread. */
router.put('/:_id', function(req, res, next) {
	Controller.markAsRead(req, res, next);
});

/* PUT a message. */
router.put('/messages/:_id', function(req, res, next) {
	Controller.markMessageAsRead(req, res, next);
});

/* DELETE a thread. */
router.delete('/:_id', function(req, res, next) {
	Controller.deleteThread(req, res, next);
});

/* DELETE a message. */
router.delete('/messages/:_id', function(req, res, next) {
	Controller.deleteMessage(req, res, next);
});

module.exports = router;
