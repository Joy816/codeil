const mongoose = require ("mongoose");

mongoose.connect('mongodb://localhost/codeial_development', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error while connecting to the database:'));

db.once('open', function() {
  console.log("Succesfully connected to the database :: mongoDB");
});

module.exports = db;