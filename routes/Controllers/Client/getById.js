var Client = require('../../../models/Client');

module.exports = function(req, res, next) {
	var { _id } = req.params;
	
	Client.findById({_id: _id}, function(err, client) {
		if (err) {
			return next(err);
		}

		if (!client) {
			return res.json({
				status: 'error',
				result: 'No user by that id found'
			});
		}

		res.json({
			status: 'success',
			result: client
		});
	});
};