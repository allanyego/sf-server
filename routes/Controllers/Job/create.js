var Model = require('../../../models/Job');

module.exports = function(req, res, next) {
	var query = Model.create(req.body);
	
	query.then(
		function(job) {
			res.json({
				status: 'success',
				result: job
			});
		},
		function(err) {
			next(err)
		}
	);
}