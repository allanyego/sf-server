var Model = require('../../../models/Job');

module.exports = function(req, res, next) {
	var { _id } = req.params;
		query = Model.findById(_id).populate(
			'client', '-jobs -reviews -accountType -password -profile.email'
		);

	query.then(
		function(job) {
			if (!job) {
				return res.json({
					status: 'fail',
					result: 'No job by that ID'
				});
			}

			res.json({
			 	status: 'success',
			 	result: job
			 });
		},
		function(err) {
			next(err);
		}
	);
};