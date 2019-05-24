var Model = require('../../../models/Thread');

module.exports = function (req, res, next) {
	var { _id } = req.params,
		{ thread } = req.body;

	if (!thread) {
		return res.json({
			status: 'fail',
			result: 'thread property not provided'
		});
	}

	var query = Model.findById(thread);

	query.then(
		function(thread) {
			var msg = thread.messages.id(_id);

			msg.remove(function(err, opRes) {
				if (err) {
					return next(err);
				}

				res.json({
					status: 'success',
					result: 'Message: '+ _id +' deleted'
				});
			});
		},
		function(err) {
			next(err);
		}
	);
};