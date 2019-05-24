var create = require('./create');

module.exports = function(req, res, next) {
	create('Talent', {
		req, res, next
	});
};