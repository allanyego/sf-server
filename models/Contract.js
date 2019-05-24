var mongoose = require('mongoose');

var contractSchema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	talent: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	bid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bid',
		required: true
	},
	job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job',
		required: true
	},
	status: {
		type: 'String',
		enum: ['inNegotiation', 'inProgress', 'complete'],
		default: 'inNegotiation'
	},
	reviewedTerms: {
		bidPrice: {
			type: Number,
			min: 55
		},
		duration: {
			type: String,
			enum: ['ltw', 'ltm', '1t3m', '3t6m', 'mt6m']
		},
		viewed: {
			type: 'Boolean'
		}
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('Contract', contractSchema);