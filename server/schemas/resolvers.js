const { User, Chat, Lesson } = require('../models');
const { remove } = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().select('-__v -password');
    },
    
    user: async (parent, { fullName }) => {
      return User.findOne({ fullName }).select('-__v -password');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
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
    getName: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    getLeaders: async () => {
      return Leaders.find().select('-__v');
    }
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addChat: async (parent, { chatText }, context) => {
      // console.log(context.user.fullName)
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
        throw AuthenticationError;
        ('You need to be logged in!');
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
        throw AuthenticationError;
      },
      addLeader: async (parent, { leaderName, leaderBio, leaderPhone, leaderEmail, leaderImage }) => {
        return Leaders.create({ leaderName, leaderBio, leaderPhone, leaderEmail, leaderImage });
      },
      removeLeader: async (parent, { _id }) => {
        return Leaders.findOneAndDelete({ _id });
      },
  },
};

module.exports = resolvers;
