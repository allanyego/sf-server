var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	UserModel = require('../models/User'),
	user = {
		username: 'liltony',
		password: 'password',
		accountType: 'Talent',
		firstName: 'Tonny',
		lastName: 'Tone',
		email: 'jay@zmail.com',
		address: '345',
		region: 'Nairobi',
		town: 'Nairobi',
		zipcode: 00100
	},
	profile = {
		address: '5th St',
		region: 'Nyanza',
		town: 'Kisumu',
		zipcode: 30400
	};

after('Deleting test user', function() {
	user._id && UserModel.findByIdAndDelete(user._id).
		then(function() {
			console.log('Test user deleted.');
		});
});

describe('Users', function() {
	describe('#POST /users', function() {
		it('responds with created user', function(done) {
			request(server).
				post('/users').
				send(user).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				end(function(err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.result.username).to.equal(user.username, 'usernames do not match');
					user = res.body.result;
					done();
				});
		});
	});

	describe('#POST /users/auth', function() {
		it('authorizes when given correct credentials', function(done) {
			request(server).
				post('/users/auth').
				send({
					username: user.username,
					password: user.password
				}).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.status).to.equal('success');
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#PUT /users/:_id', function() {
		it('responds with updated user', function(done) {
			request(server).
				put('/users/' + user._id).
				send(profile).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.profile.town).to.equal(profile.town);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	})
});