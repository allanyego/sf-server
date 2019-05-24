var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	town: {
		type: String,
		required: true
	},
	region: {
		type: String,
		required: true
	},
	zipcode: {
		type: String,
		required: true
	}
}, {
    _id: false    
});

module.exports = userSchema;

