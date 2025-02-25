// server/models/index.js
const User = require('./User');
const Chat = require('./Chat');
const Lesson = require('./Lesson');  // Ensure this import exists and the file name matches
const Event = require('./Event');
const Leaders = require('./Leaders');

module.exports = { User, Chat, Lesson, Event, Leaders };
