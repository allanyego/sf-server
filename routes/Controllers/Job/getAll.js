var Model = require('../../../models/Job');

module.exports = function(req, res, next) {
	var query = Model.find().populate(
			'client', '-jobs -reviews -accountType -password -profile.email'
		);

	query.then(
		function(jobs) {
			res.json({
				status: 'success',
				result: jobs
			});
		},
		function(err) {
			next(err);
		}
	);
};