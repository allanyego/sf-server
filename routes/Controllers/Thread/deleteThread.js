var Model = require('../../../models/Thread');

module.exports = function(req, res, next) {
		var { _id } = req.params,
			tQuery = Model.findByIdAndDelete(_id);
		
		tQuery.then(
			function(writeOpResult) {
				res.json({
					status: 'success',
					result: 'Thread: '+ _id +' deleted'
				});
			},
			function(err) {
				next(err);
			}
		);
};