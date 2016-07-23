const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/db');

const nurseSchema = new Schema({
  first: String,
  last: String,
  beds: [String],
});

const nurse = mongoose.model('nurse', nurseSchema);

module.exports = nurse;
