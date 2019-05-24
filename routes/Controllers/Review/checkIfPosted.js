var Model = require('../../../models/Review');

module.exports = function(req, res, next) {
	var { contract, by } = req.body,
		query = Model.findOne({
			contract,
			by
		});

	query.then(
		function(review) {
			if (!review) {
				return next();
			}

			res.json({
				status: 'fail',
				result: 'Review for contract already exists'
			});
		},
		function(err) {
			next(err);
		}
	);
};