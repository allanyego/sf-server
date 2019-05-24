var Model = require('../../../models/Bid');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		query = Model.find({job: _id});

	query.then(
		function(bids) {
			res.json({
				status: 'success',
				result: bids
			});
		},
		function(err) {
			next(err);
		}
	);
};
