// server/schemas/resolvers.js
const { User, Chat, Lesson, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().select('-__v -password');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    getChats: async (parent, { fullName }) => {
      const params = fullName ? { fullName } : {};
      return Chat.find(params).sort({ createdAt: -1 });
    },
    getSingleChat: async (parent, { chatId }) => {
      return Chat.findOne({ _id: chatId });
    },
    getEvents: async () => {
      return Event.find().sort({ date: 1 });
    },
    getSingleEvent: async (parent, { eventId }) => {
      return Event.findById(eventId);
    },
    getLessons: async () => {
      return Lesson.find().sort({ createdAt: -1 });
    },
    getSingleLesson: async (parent, { lessonId }) => {
      return Lesson.findById(lessonId);
    },
  },
  Mutation: {
    addUser: async (parent, { fullName, email, password, role }) => {
      const user = await User.create({ fullName, email, password, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addChat: async (parent, { chatText }, context) => {
      if (context.user) {
        const chat = await Chat.create({
          chatText,
          chatAuthor: context.user.fullName,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { chats: chat._id } }
        );

        return chat;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { chatId, commentText }, context) => {
      if (context.user) {
        return Chat.findOneAndUpdate(
          { _id: chatId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.fullName },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addEvent: async (parent, { name, date, price, image, link }) => {
      return Event.create({ name, date, price, image, link });
    },
    deleteEvent: async (parent, { eventId }) => {
      const event = await Event.findById(eventId);
      if (event) {
        await event.remove();
        return event;
      }
      throw new Error('Event not found');
    },
    addLesson: async (parent, { lessonTitle, lessonDetails, lessonAuthor, audio, image }) => {
      return Lesson.create({ lessonTitle, lessonDetails, lessonAuthor, audio, image });
    },
    deleteLesson: async (parent, { lessonId }) => {
      const lesson = await Lesson.findById(lessonId);
      if (lesson) {
        await lesson.remove();
        return lesson;
      }
      throw new Error('Lesson not found');
    },
  },
};

module.exports = resolvers;
