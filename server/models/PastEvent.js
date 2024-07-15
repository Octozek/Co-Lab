const mongoose = require('mongoose');

const pastEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  images: { type: [String], required: true },
});

module.exports = mongoose.model('PastEvent', pastEventSchema);
