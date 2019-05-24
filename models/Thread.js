var mongoose = require('mongoose'),
	messageSchema = require('./sub-docs/message');

var threadSchema = new mongoose.Schema({
	users: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	messages: {
		type: [messageSchema]
	}
});

module.exports = mongoose.model('Thread', threadSchema);