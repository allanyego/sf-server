var Model = require('../../../models/Thread');

module.exports = function (req, res, next) {
	var {to, ...msg} = req.body;
	
	if (!to ) {
		return res.json({
			status: 'fail',
			result: 'First message to a new thread requires a \'to\' property'
		});
	}
	
	Model.create({}).
		then(
			function(thread) {
				msg.thread = thread._id;
				msg = thread.messages.create(msg);
				
				thread.users.push(to, msg.user);
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
			},
			function(err) {
				next(err);
			}
		);
};