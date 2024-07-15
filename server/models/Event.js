const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
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
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    headcount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model('Event', eventSchema);

module.exports = Event;
