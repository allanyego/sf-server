var mongoose = require('mongoose'),
	User = require('./User');

module.exports = User.discriminator('Client', new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	jobs: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}]
	}
}));