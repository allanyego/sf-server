var mongoose = require('mongoose')
	profileSchema = require('./sub-docs/profile');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		type: profileSchema,
		required: true
	},
	profileCompletion: {
		type: Number,
		default: 50
	}
}, {
	discriminatorKey: 'accountType'
},
{
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);