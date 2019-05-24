var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	UserModel = require('../models/User'),
	JobModel = require('../models/Job'),
	BidModel = require('../models/Bid'),
	bid = {
		cover: 'I egt those goosebumbs every time yeah, you come around' +
			' you make everything for fun. Some days I cant get out of my head' +
			'. Some days it gets so hard to sleep, thats just the darkside of me.',
		bidPrice: 3500,
		duration: 'ltw',
	},
	client = {_id: '5c8fd90785723a196c6a2c13'},
	job = {_id: '5c8fd90785723a196c6a2c14'}, 
	talent = {_id: '5c8fd95985723a196c6a2c14'};

before('Creating test users and job', async function() {
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

	job = await JobModel.create({
		client: client._id,
		title: 'A simple job',
		description: 'I need a couple of stuff moved',
		jobType: 'fixed',
		budget: '4200',
		duration: 'ltw',
		hiring: 4,
		skillLevel: 'entry'
	});	
});

after('Deleting test users and job', function() {
	UserModel.findByIdAndDelete(client._id).
		then(
			function(opRes) {
				console.log('Test client deleted');
			}
		);
	UserModel.findByIdAndDelete(talent._id).
		then(
			function(opRes) {
				console.log('Test talent deleted');
			}
		);

	JobModel.findByIdAndDelete(job._id).
		then(
			function(opRes) {
				console.log('Test job deleted');
			}
		);
	BidModel.findByIdAndDelete(bid._id).
		then(
			function(opRes) {
				console.log('Test bid deleted');
			}
		);

	msg = reply = client = talent = threads = null;
});

describe('Bids', function() {
	describe('#POST /bids/:jobId', function() {
		it('responds with created bid', function(done) {
			request(server).
				post('/bids/' + job._id).
				send({
					...bid,
					talent: talent._id,
					job: job._id
				}).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.have.property('status', 'active');
						bid = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#GET /bids/talents/:_id', function() {
		it('responds with talent\'s bids', function(done) {
			request(server).
				get('/bids/talents/' + talent._id).
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

	describe('#GET /bids/jobs/:_id', function() {
		it('responds with job\'s bids', function(done) {
			request(server).
				get('/bids/jobs/' + job._id).
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

	describe('#PUT /bids/:_id', function() {
		it('responds with updated bid', function(done) {
			bid = Object.assign(bid, {
				bidPrice: 4500,
				duration: 'ltm'
			});

			request(server).
				put('/bids/' + bid._id).
				send(bid).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.duration).to.equal(bid.duration);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});
});