'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	thread: {
		type: mongoose.Schema.Types.ObjectId
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	attachments: {
		type: []
	},
	read: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: true
});