var Model = require('../../../models/User');

module.exports = function(req, res, next) {
	const { username, password } = req.body,
		query = Model.findOne({username: username});

	query.then(
		function(user) {
			if (!user) {
				return res.json({
					status: 'fail',
					result: 'No user by that username'
				});
			}

			res.json({
				status: 'success',
				result: user
			});
		},
		function(err) {
			next(err);
		}
	);
}