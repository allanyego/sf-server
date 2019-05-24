var mongoose = require('mongoose');

var otherAchievementsSchema = new mongoose.Schema({
	subject: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
    _id: false    
});

module.exports = otherAchievementsSchema;