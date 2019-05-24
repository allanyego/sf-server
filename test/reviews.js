var request = require('supertest'),
	server = require('../bin/www'),
	expect = require('chai').expect,
	UserModel = require('../models/User'),
	JobModel = require('../models/Job'),
	BidModel = require('../models/Bid'),
	ContractModel = require('../models/Contract'),
	client, talent, job, bid, contract, review;


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

	contract = await ContractModel.create({
		job: job._id,
		bid: bid._id,
		client: client._id,
		talent: talent._id
	});

	review = {
		contract: contract._id,
		to: talent._id,
		by: client._id,
		text: 'Great talent',
		rating: 4
	}
});

describe('Reviews', function() {
	describe('#POST /reviews/talents', function() {
		it('fails when contract is incomplete', function(done) {
			request(server).
				post('/reviews/talents').
				send(review).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.status).to.equal('fail');
						expect(res.body.result).to.match(/incomplete/);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});

		it('succeeds on a complete contract', function(done) {
			ContractModel.updateOne({
				_id: contract._id
			}, {
				status: 'complete'
			}).then(
				function(c) {
					request(server).
					post('/reviews/talents').
					send(review).
					set('Accept', 'application/json').
					expect('Content-Type', /json/).
					expect(200).
					then(
						function(res) {
							expect(res.body.result).to.be.an('object').that.
								has.property('text', review.text);
							review = res.body.result;
							done();
						},
						function(err) {
							done(err);
						}
					);
				},
				function(err) {
					console.log('Error', err.stack);
				}
			);
		});

		it('fails on double posting review', function(done) {
			ContractModel.updateOne({
				_id: contract._id
			}, {
				status: 'complete'
			}).then(
				function(c) {
					request(server).
					post('/reviews/talents').
					send({
						contract: contract._id,
						to: talent._id,
						by: client._id
					}).
					set('Accept', 'application/json').
					expect('Content-Type', /json/).
					expect(200).
					then(
						function(res) {
							expect(res.body.status).to.equal('fail');
							expect(res.body.result).to.match(/exists/);
							done();
						},
						function(err) {
							done(err);
						}
					);
				},
				function(err) {
					console.log('Error', err.stack);
				}
			);
		});
	});

	describe('#GET /reviews/:_id', function() {
		it('responds with user reviews', function(done) {
			request(server).
				get('/reviews/' + talent._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result[0].text).to.equal(review.text);
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#PUT /reviews/:_id', function() {
		it('responds with updated review', function(done) {
			var temp = {
				rating: 3,
				text: 'Worked really well'
			};

			request(server).
				put('/reviews/' + review._id).
				send(temp).
				set('Accept', 'application/json').
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.result.text).to.equal(temp.text);
						review = res.body.result;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});

	describe('#DELETE /reviews/:_id', function() {
		it('successfully deletes review', function(done) {
			request(server).
				delete('/reviews/' + review._id).
				expect('Content-Type', /json/).
				expect(200).
				then(
					function(res) {
						expect(res.body.status).to.equal('success');
						expect(res.body.result).to.match(/deleted/);
						review = null;
						done();
					},
					function(err) {
						done(err);
					}
				);
		});
	});
});

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