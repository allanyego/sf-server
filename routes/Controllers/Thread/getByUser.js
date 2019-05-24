var Model = require('../../../models/Thread');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		query = Model.find().
			where(`users.contains(${_id})`).
			populate({
				path: 'users',
				select: 'username profile'
			});

	query.then(
		function(threads) {
			res.json({
				status: 'success',
				result: threads
			});
		},
		function(err) {
			next(err);
		}
	);
};