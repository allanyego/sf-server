var Model = require('../../../models/Review'),
	UserModel = require('../../../models/User');

/**
 * Helper for adding new reviews
 * @param {String} byModel
 * @param {Object} middlewares - express middleware params
 */
function create(byModel, middlewares) {
	var { to, by, text, rating, contract } = middlewares.req.body,
		query = Model.create({
			to, by, text, rating, contract,	byModel
		}),
		toQuery = UserModel.findById(to);


	toQuery.then(
		function(user) {
			if (!user) {
				return middlewares.res.json({
					status: 'fail',
					result: 'No user by that id'
				});
			}

			query.then(
				function(review) {
					middlewares.res.json({
						status: 'success',
						result: review
					});
				},
				function(err) {
					middlewares.next(err);
				}
			);
		},
		function(err) {
			middlewares.next(err);
		}
	);
}

module.exports = create;