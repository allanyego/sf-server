var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	client;

describe('Clients', function() {
	describe('#GET /clients', function() {
		it('responds with clients', function(done) {
			request(server).
				get('/clients').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.an('array');
						client = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#GET /clients/:_id', function() {
		var _id = (client && client._id)|| '5c8fd90785723a196c6a2c13'
		
		it('responds with client by _id', function(done) {
			request(server).
				get('/clients/' + _id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.username).to.equal(client.username);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});
});