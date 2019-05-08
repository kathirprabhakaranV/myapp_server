var mongoose = require('mongoose');

var connModelDB = {};

connModelDB.createConnectionDB = createConnectionDB;

module.exports = connModelDB;

function createConnectionDB() {
	return mongoose.createConnection('mongodb://127.0.0.1:27017/phase1', {useNewUrlParser: true});
}