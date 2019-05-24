var Model = require('../../../models/User');

module.exports = function(req, res, next) {
	var { username, password, accountType, ...rest } = req.body,
		query = Model.findOne({username: username});

	query.then(
		onUserFound,
		function(err) {
			next(err);
		}
	);

	function onUserFound(user) {
		if (user) {
			return res.json({
				status: 'fail',
				result: 'That username has already been taken'
			});
		}

		Model.create({
			username: username, 
			password: password,
			accountType: accountType,
			profile: rest}).
			then(
				function(user) {
					// res.statusCode(201);
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
};