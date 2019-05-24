var Model = require('../../../models/Contract');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		query = Model.find({talent: _id}).
			populate('bid').
			populate('job');

	query.then(
		function(contracts) {
			res.json({
				status: 'success',
				result: contracts
			});
		},
		function(err) {
			next(err);
		}
	);
};