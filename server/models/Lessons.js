// server/models/Lesson.js
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const lessonSchema = new Schema({
  lessonTitle: {
    type: String,
    required: true,
    minlength: 1,
  },
  lessonDetails: {
    type: String,
    required: true,
  },
  lessonAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  audio: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Lesson = model('Lesson', lessonSchema);

module.exports = Lesson;
