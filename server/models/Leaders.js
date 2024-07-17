const { Schema, model } = require('mongoose');

const leaderSchema = new Schema({
  leaderName: {
    type: String,
    required: true,
  },
  leaderBio: {
    type: String,
    required: true,
  },
  leaderPhone: {
    type: String,
    required: true,
  },
  leaderEmail: {
    type: String,
    required: true,
  },
  leaderImage: {
    type: String,
    required: false,
  },
});

const Leaders = model('Leaders', leaderSchema);

module.exports = Leaders;
