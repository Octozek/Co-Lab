const { User, Chat, Lessons } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    getChats: async (parent, { fullName }) => {
      const params = fullName ? { fullName } : {};
      return Chat.find(params).sort({ createdAt: -1 });
    },
    getSingleChat: async (parent, { chatId }) => {
      return Chat.findOne({ _id: chatId  });
    },
  },
  
  Mutation: {
    addUser: async (parent, { fullName, email, password, confirmPassword }) => {
      const user = await User.create({ fullName, email, password, confirmPassword });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { fullName, email, password }) => {
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
      console.log(context.user.fullName)
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
      // removeChat: async (parent, { chatId }, context) => {
      //   if (context.user) {
      //     const chat = await Chat.findOneAndDelete({
      //       _id: chatId,
      //       chatAuthor: context.user.fullName,
      //     });
  
      //     await User.findOneAndUpdate(
      //       { _id: context.user._id },
      //       { $pull: { chats: chat._id } }
      //     );
  
      //     return chat;
      //   }
      //   throw AuthenticationError;
      // },
      // removeComment: async (parent, { chatId, commentId }, context) => {
      //   if (context.user) {
      //     return Chat.findOneAndUpdate(
      //       { _id: chatId },
      //       {
      //         $pull: {
      //           comments: {
      //             _id: commentId,
      //             commentAuthor: context.user.fullName,
      //           },
      //         },
      //       },
      //       { new: true }
      //     );
      //   }
      //   throw AuthenticationError;
      // },

  },
};

module.exports = resolvers;
