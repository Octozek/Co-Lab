// models/Event.js
const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

const Event = model('Event', eventSchema);

module.exports = Event;
