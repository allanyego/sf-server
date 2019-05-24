var Model = require('../../../models/Talent');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		query = Model.findById(_id);

	query.then(
		onTalentFound,
		function(err) {
			next(err);
		}
	);
	
	function onTalentFound(talent) {
		if (!talent) {
			return res.json({
				status: 'fail',
				result: 'No talent by that ID'
			});
		}

		res.json({
			status: 'success',
			result: talent
		});
	}
};