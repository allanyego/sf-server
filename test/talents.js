var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	TalentModel = require('../models/Talent'),
	talent;

before('Creating test client', async function() {
	talent = await TalentModel.create({
		username: 'tonytone',
		password: 'password',
		accountType: 'Talent',
		profile: {
			firstName: 'Tonny',
			lastName: 'Tone',
			email: 'jay@zmail.com',
			address: '345',
			region: 'Nairobi',
			town: 'Nairobi',
			zipcode: 00100
		}
	});
})

after('Deleting test talent', function() {
	TalentModel.findByIdAndDelete(talent._id).
		then(
			function() {
				console.log('Test talent deleted');
			}
		);
});

describe('Talents', function() {
	describe('#GET all', function() {
		it('responds with talents', function(done) {
			request(server).
				get('/talents').
				expect('Content-Type', /json/).
				end(function(err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.result).to.be.an('array', 'res.body.result is not an array');
					done();
				});
		});
	});


	describe('#GET by _id', function() {
		it('responds with talent by _id', function(done) {
			request(server).
				get('/talents/' + talent._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.username).to.equal(talent.username, 'usernames do not match');		
						done()
					},
					function(err) {
						done(err);
					});
		});
	});
});