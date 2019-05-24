 var Bid = require('../../../models/Bid'),
	JobModel = require('../../../models/Job');

module.exports = function(req, res, next) {
	var { jobId } = req.params,
		jobQuery = JobModel.findById(jobId),
		bidQuery = Bid.findOne({
			job: jobId,
			talent: req.body.talent
		});

	jobQuery.then(
		function(job) {
			if (!job) {
				return res.json({
					status: 'fail',
					result: 'No job by that id'
				});
			}

			bidQuery.then(
				onBid,
				function(err) {
					next(err);
				}
			);
		},

		function(err) {
			next(err);
		}
	);

	function onBid(bid) {
		if (bid) {
			return res.json({
				status: 'fail',
				result: 'Bid already placed for this job.'
			});
		}

		Bid.create({
			...req.body,
			job: jobId
		}).then(
			function(bid) {
				res.json({
					status: 'success',
					result: bid
				});
			},
			function(err) {
				next(err);
			}
		);
	}
};
