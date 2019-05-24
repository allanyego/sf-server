var mongoose = require('mongoose');

var bidSchema = new mongoose.Schema({
	talent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Talent',
		required: true
	},
	job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job',
		required: true
	},
	bidPrice: {
		type: Number,
		required: true
	},
	duration: {
		type: String,
		enum: ['ltw', 'ltm', '1t3m', '3t6m', 'mt6m'],
		required: true
	},
	cover: {
		type: String,
		minLength: 150,
		required: true
	},
	answers: {
		type: []
	},
	attachments: {
		type: []
	},
	status: {
		type: 'String',
		enum: ['active', 'withdrawn'],
		default: 'active'
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('Bid', bidSchema);