var Model = require('../../../models/Client');

module.exports = function(req, res, next) {
	var query = Model.find();

	query.then(
		function(clients) {
			res.json({
				status: 'success',
				result: clients
			});
		},
		function(err) {
			next(err);
		}
	);
};