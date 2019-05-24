var Model = require('../../../models/Thread'),
	expect = require('chai').expect;

module.exports = function(req, res, next) {
	var { _id } = req.params,
		{ thread } = req.body,
		query = Model.findById(thread),
		msg;

	query.then(
		function(thread) {
			msg = thread.messages.id(_id);
			msg.read = true;

			thread.save(function(err, thread) {
				if (err) {
					return next(err);
				}

				res.json({
					status: 'success',
					result: msg
				});
			})
		},
		function(err) {
			next(err);
		}
	);
};