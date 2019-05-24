var Model = require('../../../models/User');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		{ firstName, lastName, address, town, region, zipcode } = req.body,
		query = Model.findById(_id);

	query.then(
		function(user) {
			if (!user) {
				return res.json({
					status: 'fail',
					result: 'No user by that ID'
				});
			}

			if (firstName) {
				user.profile.firstName = firstName;
			}
			if (lastName) {
				user.profile.lastName = lastName;
			}
			if (address) {
				user.profile.address = address;
			}
			if (town) {
				user.profile.town = town;
			}
			if (region) {
				user.profile.region = region;
			}
			if (zipcode) {
				user.profile.zipcode = zipcode;
			}

			user.save(function(err, user) {
				if (err) {
					return next(err);
				}

				res.json({
					status: 'success',
					result: user
				});
			});
		},
		function(err) {
			next(err);
		}
	);
};