var Model = require('../../../models/Contract');

module.exports = function(req, res, next) {
	var { job, bid, client, talent } = req.body,
		query = Model.create({
			job, bid, client, talent
		});

	query.then(
		function(contract) {
			res.json({
				status: 'success',
				result: contract
			});
		},
		function(err) {
			next(err);
		}
	);
};