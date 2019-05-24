var Model = require('../../../models/Contract');

module.exports = function(req, res, next) {
	var { contract, by } = req.body,
		query = Model.findById(contract);

	query.then(
		function(c) {
			if (!c) {
				return res.json({
					status: 'fail',
					result: 'No contract by that id: ' + contract
				});
			}

			if ((c.status !== 'complete') && (!req.headersSent)) {
				return res.json({
					status: 'fail',
					result: 'Contract is incomplete'
				});
			}

			next();
		},
		function(err) {
			next(err);
		}
	);
};