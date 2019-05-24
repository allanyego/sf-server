var mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
	image: {
		type: String
	},
	link: {
		type: String
	},
	description: {
		type: String,
		required: true
	}
}, {
    _id: false    
});

module.exports = portfolioSchema;