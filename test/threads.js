var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	UserModel = require('../models/User'),
	msg, reply, threads,
	client, talent;

before('Creating test users', async function() {
	client = await UserModel.create({
		username: 'future',
		password: 'password',
		accountType: 'Client',
		profile: {
			firstName: 'Boy',
			lastName: 'Tall',
			email: 'future@mail.com',
			address: '345',
			region: 'Central',
			town: 'Kiambu',
			zipcode: 60100
		}
	});

	talent = await UserModel.create({
		username: 'handyman',
		password: 'password',
		accountType: 'Talent',
		profile: {
			firstName: 'Handy',
			lastName: 'Man',
			email: 'hman@mail.com',
			address: '345',
			region: 'Central',
			town: 'Meru',
			zipcode: 60100
		}
	});
});

after('Deleting test users', function() {
	UserModel.findByIdAndDelete(client._id).
		then(
			function(res) {
				console.log('Test client deleted');
			}
		);

	UserModel.findByIdAndDelete(talent._id).
		then(
			function(res) {
				console.log('Test talent deleted');
			}
		);
	msg = reply = client = talent = threads = null;
});

describe('Threads', function() {
	describe('#POST /threads', function() {
		it('responds with created message', function(done) {
			msg = {
				to: (talent && talent._id) || '5c8fd95985723a196c6a2c14',
				user: (client && client._id) || '5c8fd90785723a196c6a2c13',
				text: 'Can you do this job?'
			};

			request(server).
				post('/threads').
				send(msg).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.text).to.equal(msg.text);
						expect(res.body.result).to.be.an('object').
							that.has.property('read', false);
						msg = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#POST /threads/messages', function() {
		it('responds with added message', function(done) {
			reply = {
					user: (talent && talent._id) || '5c8fd95985723a196c6a2c14',
					text: 'Yes I can.',
					thread: msg.thread
				};
			request(server).
				post('/threads/messages').
				send(reply).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.text).to.equal(reply.text);
						expect(res.body.result).to.be.an('object').
							that.has.property('read', false);
						reply = res.body.result;
						done();
					},
					function(err) {}
				);
		});
	})

	describe('#GET /threads/:_id', function() {
		it('responds with user threads', function(done) {
			var _id = ((talent && talent._id) || '5c8fd95985723a196c6a2c14');

			request(server).
				get('/threads/' + _id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('array');
						threads = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#PUT /threads/messages/:_id', function() {
		it('responds with success', function(done) {
			request(server).
				put('/threads/messages/' + msg._id).
				send({
					thread: msg.thread
				}).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.status).to.equal('success');
						msg = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);

		});
	});

	describe('#PUT /threads/:_id', function() {
		it('responds with success', function(done) {
			request(server).
				put('/threads/' + msg.thread).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						var thread;
						expect(res.body.status).to.equal('success');
						thread = threads.find(function(t) {
							return t._id === msg.thread;
						});

						thread = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);

		});
	});

	describe('#DELETE /threads/messages/:_id', function() {
		it('responds with success', function(done) {
			request(server).
				delete('/threads/messages/' + msg._id).
				send({
					thread: msg.thread
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

	describe('#DELETE /threads/:_id', function() {
		it('responds with success', function(done) {
			request(server).
				delete('/threads/' + msg.thread).
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
});