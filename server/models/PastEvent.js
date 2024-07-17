const { Schema, model } = require('mongoose');

const pastEventSchema = new Schema({
  title: { 
    type: String, 
    required: true
  },
  date: { 
    type: String, 
    required: true 
  },
  images: { 
    type: [String], 
    required: true 
  },
});

const PastEvent = model('PastEvent', pastEventSchema);

module.exports = PastEvent;
