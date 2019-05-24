var Model = require('../../../models/Thread');

module.exports = function(req, res, next) {
	var msg = { thread, text, user, attachments } = req.body,
		tQuery = Model.findById(thread);

	tQuery.then(
		onThreadFound,
		function(err) {
			next(err);
		}
	);

	function onThreadFound(thread) {
		if (!thread) {
			return res.json({
				status: 'fail',
				result: 'No thread by that ID'
			});
		}

		msg = thread.messages.create(msg);
		
		thread.messages.push(msg);
		thread.save(function(err, thread) {
			if (err) {
				return next(err);
			}

			res.json({
				status: 'success',
				result: msg
			});

		});
	}
};