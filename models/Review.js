var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
	contract: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Contract',
		required: true
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	by: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'byModel',
		required: true
	},
	text: {
		type: String
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
	},
	byModel: {
		type: String,
		required: true,
		enum: ['Client', 'Talent']
	}
},
{
	timestamps: true
});

 module.exports = mongoose.model('Review', reviewSchema);