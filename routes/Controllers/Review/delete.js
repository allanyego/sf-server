var Model = require('../../../models/Review');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		query = Model.findByIdAndDelete(_id);

	query.then(
		function(opRes) {
			res.json({
				status: 'success',
				result: 'Review deleted'
			});
		},
		function(err) {
			next(err);
		}
	)
};