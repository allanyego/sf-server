var Model = require('../../../models/Bid');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		{ countOnly } = req.query,
		query = countOnly ? Model.countDocuments({talent: _id}) :
			Model.find({talent: _id});

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
