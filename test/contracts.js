var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	UserModel = require('../models/User'),
	JobModel = require('../models/Job'),
	BidModel = require('../models/Bid'),
	ContractModel = require('../models/Contract'),
	client, talent, job, bid, contract;


before('Creating test models', async function() {
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

	bid = await BidModel.create({
		client: client._id,
		talent: talent._id,
		job: job._id,
		cover: 'I egt those goosebumbs every time yeah, you come around' +
			' you make everything for fun. Some days I cant get out of my head' +
			'. Some days it gets so hard to sleep, thats just the darkside of me.',
		bidPrice: 3500,
		duration: 'ltw',
	});
});

describe('Contracts', function() {
	describe('#POST /contracts', function() {
		it('responds with created contract', function(done) {
			contract = {
				client: client._id,
				talent: talent._id,
				job: job._id,
				bid: bid._id
			};

			request(server).
				post('/contracts').
				send(contract).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('object').that.
							has.property('status', 'inNegotiation');
						contract = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#GET /contracts/clients/:_id', function() {
		it('responds with client\'s contracts', function(done) {
			request(server).
				get('/contracts/clients/' + client._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('array');
						expect(res.body.result[0].client).to.equal(`${client._id}`);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#GET /contracts/talents/:_id', function() {
		it('responds with talent\'s contracts', function(done) {
			request(server).
				get('/contracts/talents/' + talent._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('array');
						expect(res.body.result[0].talent).to.equal(`${talent._id}`);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#PUT /contracts/:_id', function() {
		it('responds with updated contract', function(done) {
			var newTerms = {
				bidPrice: 4000,
				duration: 'ltm'
			};

			request(server).
				put('/contracts/' + contract._id).
				send(newTerms).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result).to.be.an('object');
						expect(res.body.result.reviewedTerms.bidPrice).
							to.equal(newTerms.bidPrice);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});
})

after('Deleting test models', function() {
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

	JobModel.findByIdAndDelete(job._id).
		then(
			function(res) {
				console.log('Test job deleted');
			}
		);

	BidModel.findByIdAndDelete(bid._id).
		then(
			function(res) {
				console.log('Test bid deleted');
			}
		);
	ContractModel.findByIdAndDelete(contract._id).
		then(
			function(res) {
				console.log('Test contract deleted');
			}
		);
})