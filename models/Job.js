var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true
	},
	jobType: {
		type: String,
		enum: ['fixed', 'hourly'],
		required: true
	},
	budget: {
		type: Number,
		min: 60,
		required: function() {
			return this.budget === 'fixed'
		}
	},
	duration: {
		type: String,
		enum: ['ltw', 'ltm', '1t3m', '3t6m', 'mt6m'],
		required: true
	},
	skills: {
		type: [String]/*,
		required: true*/
	},
	skillLevel: {
		type: String,
		enum: ['entry', 'intermediate', 'expert'],
		required: true
	},
	hiring: {
		type: Number,
		required: true
	},
	paymentVerified: {
		type: Boolean,
		default: false
	},
	negotiating: {
		type: Number,
		default: 0
	},
	questions: {
		type: []
	},
	status: {
		type: String,
		enum: ['open', 'progress', 'closed'],
		default: 'open'
	}
},
{
	timestamps: true
});

jobSchema.pre('find', function() {
	this.populate('bids');
	this.populate('client');
});

module.exports = mongoose.model('Job', jobSchema);