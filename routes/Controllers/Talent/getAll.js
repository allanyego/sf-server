var Model = require('../../../models/Talent');

module.exports = function(req, res, next) {
	var query = Model.find();

	query.then(
		function(talents) {
			res.json({
				status: 'success',
				result: talents
			});
		},
		function(err) {
			next(err);
		}
	);
};