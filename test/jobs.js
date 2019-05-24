var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	Model = require('../models/Job'),
	ClientModel = require('../models/Client'),
	job = {
		title: 'A simple job',
		description: 'I need a couple of stuff moved',
		jobType: 'fixed',
		budget: '4200',
		duration: 'ltw',
		hiring: 4,
		skillLevel: 'expert'
	},
	newJobDetails = {
		title: 'A very simple job',
		hiring: 53
	},
	client;

before('Creating test client', function() {
	ClientModel.create({
		username: 'test-client',
		password: 'password',
		accountType: 'Client',
		profile: {
			firstName: 'Burna',
			lastName: 'Buoy',
			email: 'burna@mail.com',
			address: '10th St',
			town: 'Kapsabet',
			region: 'R. Valley',
			zipcode: 30400
		}
	}).then(
		function(c) {
			client = c;
		}
	);
});

after('Deleting test client and job', function() {
	ClientModel.findByIdAndDelete(client._id).
		then(function(res) {
			console.log('Test client deleted');
		});
	job._id && Model.findByIdAndDelete(job._id).
		then(
			function(res) {
				console.log('Test job deleted');
			}
		);
});

describe('Jobs', function() {
	describe('#GET /jobs', function() {
		it('responds with jobs', function(done) {
			request(server).
				get('/jobs').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('array');
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#POST /jobs', function() {
		it('responds with created job', function(done) {
			request(server).
				post('/jobs').
				send({
					...job,
					client: client._id
				}).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.title).to.equal(job.title);
						job = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		})
	});

	describe('#GET /jobs/client/:_id', function() {
		it('responds with client jobs', function(done) {
			request(server).
				get('/jobs/client/' + client._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('array');
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#GET /jobs/:_id', function() {
		it('responds with job by _id', function(done) {
			request(server).
				get('/jobs/' + job._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.title).to.equal(job.title);
						expect(res.body.result.hiring).to.equal(job.hiring);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#PUT /jobs/:_id', function() {
		it('responds with updated', function(done) {
			request(server).
				put('/jobs/' + job._id).
				send(newJobDetails).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.title).to.equal(newJobDetails.title);
						expect(res.body.result.hiring).to.equal(53);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});
});