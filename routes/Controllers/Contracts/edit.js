var Model = require('../../../models/Contract');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		{ bidPrice, duration, viewed } = req.body,
		query = Model.findById(_id);

	query.then(
		function(contract) {
			if (!contract) {
				return res.json({
					status: 'fail',
					result: 'No contract by that id'
				});
			}

			contract.reviewedTerms = Object.assign(
				contract.reviewedTerms,
				{
					bidPrice, duration,
					viewed: viewed || false
				}
			);

			contract.save(function(err, contract) {
				if (err) {
					return next(err);
				}

				res.json({
					status: 'success',
					result: contract
				});
			})
		},
		function(err) {
			next(err);
		}
	);
};