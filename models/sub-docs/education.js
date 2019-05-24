var mongoose = require('mongoose');

var educationSchema = new mongoose.Schema({
	school: {
		type: String,
		required: true
	},
	period: {
		from: { type: String, required: true },
		to: { type: String, required: true }
	},
	award: {
		type: String
	},
	description: {
		type: String
	}
}, {
    _id: false    
});

module.exports = educationSchema;