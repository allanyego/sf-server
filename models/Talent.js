var mongoose = require('mongoose');

var portfolioSchema = require('./sub-docs/portfolio'),
	employmentSchema = require('./sub-docs/employment'),
	educationSchema = require('./sub-docs/education'),
	otherAchievementsSchema = require('./sub-docs/otherAchievements'),
	User = require('./User');

module.exports = User.discriminator('Talent', new mongoose.Schema({
	availability: {
		type: String
	},
	hourly: {
		type: Number
	},
	isPublic: {
		type: Boolean,
		default: true
	},
	portfolio: {
		type: [portfolioSchema]
	},
	skills: {
		type: []
	},
	employment: {
		type: [employmentSchema]
	},
	education: {
		type: [educationSchema]
	},
	others: {
		type: [otherAchievementsSchema]
	},
	categories: {
		type: []
	},
	recentSearches: {
		type: []
	}
	/*,certifications: {
		type: [],
		default: []
	}*/
}));