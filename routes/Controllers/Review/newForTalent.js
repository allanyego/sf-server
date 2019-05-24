var create = require('./create');

module.exports = function(req, res, next) {
	create('Client', {
		req, res, next
	});
};