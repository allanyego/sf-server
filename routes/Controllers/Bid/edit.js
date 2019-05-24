var Model = require('../../../models/Bid');

module.exports = function(req, res, next) {
	var { _id } = req.params,
		{ bidPrice, duration, cover } = req.body, // we'll allow these fields for now
		bidQuery= Model.findById(_id);

	bidQuery.then(
		onBidFound,
		function(err) {
			next(err);
		}
	);

	function onBidFound(bid) {
		if (!bid) {
			return res.json({
				status: 'fail',
				result: 'No bid by that ID'
			});
		}

		bid.bidPrice = bidPrice || bid.bidPrice;
		bid.duration = duration || bid.duration;
		bid.cover = cover || bid.cover;
		bid.save(onBidUpdate);
	}

	function onBidUpdate(err, bid) {
		if (err) {
			return next(err);
		}

		res.json({
			status: 'success',
			result: bid
		});
	}
};
