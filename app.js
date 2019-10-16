var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var users = require('./routes/users');
var bids = require('./routes/bids');
var clients = require('./routes/clients');
var jobs = require('./routes/jobs');
var contracts = require('./routes/contracts');
var reviews = require('./routes/reviews');
var talents = require('./routes/talents');
var threads = require('./routes/threads');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', function(req, res, next) {
	res.status(200).json({
		msg: "Hello world"
	});
});
app.use('/users', users);
app.use('/bids', bids);
app.use('/clients', clients);
app.use('/jobs', jobs);
app.use('/contracts', contracts);
app.use('/reviews', reviews);
app.use('/talents', talents);
app.use('/threads', threads);
app.use('*', function(req, res, next) {
	res.status(404).json({
		msg: "Not Found"
	});
})

app.use(function (err, req, res, next) {
	console.error(err);
	next(err);
});
app.use(function(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}

	res.status(500);
	res.json({
		status: 'fail',
		result: err
	});
});

module.exports = app;
