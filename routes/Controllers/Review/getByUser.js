var Model = require('../../../models/Review');

module.exports = function(req, res, next) {
	console.log('GET reviews params', req.params);
	var { _id } = req.params,
		query = Model.find({to: _id}).populate('by').
			select('rating text by');

	query.then(
		function(reviews) {
			res.json({
				status: 'success',
				result: reviews
			});
		},
		function(err) {
			next(err);
		}
	);
};