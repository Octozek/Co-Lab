const typeDefs = `
  
  type User {
    _id: ID
    fullName: String
    email: String
    password: String
    chats: [Chat]!
  }

  type Chat {
    _id: ID
    chatText: String
    chatAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Lesson {
    _id: ID
    lessonTitle: String
    lessonDetails: String
    lessonAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(fullName: String!): User
    getChats(fullName: String): [Chat]
    getSingleChat(chatId: ID!): Chat
    me: User
  }

  type Mutation {
    addUser(fullName: String!, email: String!, password: String!, role: String!): Auth
    updateUser(fullName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addChat(chatText: String!): Chat
    addComment(chatId: ID!, commentText: String!): Chat
}
`;

module.exports = typeDefs;
