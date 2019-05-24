var Model = require('../../../models/Job');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		query = Model.findById(_id);

	query.then(
		function(job) {
			if (!job) {
				res.json({
					status: 'fail',
					result: 'No job by that ID'
				});
			}

			Object.assign(job, req.body);

			job.save(function(err, job) {
				if (err) {
					return next(err);
				}

				res.json({
					status: 'success',
					result: job
				});
			});
		},
		function(err) {
			next(err);
		}
	);
};