const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// session lasts 8hrs 20 mins (work shift lasts 8 hours)
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30000, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
