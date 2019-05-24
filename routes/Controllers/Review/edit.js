var Model = require('../../../models/Review');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		{ rating, text } = req.body,
		query = Model.findById(_id);

	query.then(
		onReview,
		function(err) {
			next(err);
		}
	);

	function onReview(review) {
		if (!review) {
			return res.json({
				status: 'fail',
				result: 'No review by that ID'
			});
		}

		review.rating = rating || review.rating;
		review.text = text || review.text;
		review.save(onSave);
	}

	function onSave(err, review) {
		if (err) {
			return next(err);
		}

		res.json({
			status: 'success',
			result: review
		});
	}
};