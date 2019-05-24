var mongoose = require('mongoose');

var employmentSchema = new mongoose.Schema({
	company: {
		type: String,
		required: true
	},
	location: {
		town: { type: String, required: true },
		country: { type: String, required: true }
	},
	period: {
		from: { type: String, required: true },
		to: { type: String, required: true }
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
}, {
    _id: false    
});

module.exports = employmentSchema;