var Model = require('../../../models/Thread');

module.exports = function(req, res, next) {
	var { _id } = req.params,
	query = Model.findById(_id);

	query.then(
		function(thread) {
			thread.messages.forEach(function(msg) {
				msg.read = true;
			});

			thread.save(function(err, thread) {
				res.json({
					status: 'success',
					result: thread
				});
			});
		},
		function(err) {
			next(err);
		}
	);
};