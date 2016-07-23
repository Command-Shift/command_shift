const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/db');

const bedSchema = new Schema({
  bed: String,
  status: { type: Boolean, default: true },
  notes: [String],
});

const bed = mongoose.model('bed', bedSchema);

module.exports = bed;
