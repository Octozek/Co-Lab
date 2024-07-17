const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID
    fullName: String
    email: String
    password: String
    role: String
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

  type Event {
    _id: ID
    name: String
    date: String
    price: Float
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    user(email: String!): User
    getChats(fullName: String): [Chat]
    getSingleChat(chatId: ID!): Chat
    me: User
    getEvents: [Event]
    getSingleEvent(eventId: ID!): Event
    getLessons: [Lesson]
    getSingleLesson(lessonId: ID!): Lesson
    getName(_id: ID!): User
  }

  type Mutation {
    addUser(fullName: String!, email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    addChat(chatText: String!): Chat
    addComment(chatId: ID!, commentText: String!): Chat
    addEvent(name: String!, date: String!, price: Float, image: String!, link: String): Event
    deleteEvent(eventId: ID!): Event
    addLesson(lessonTitle: String!, lessonDetails: String!, lessonAuthor: String!): Lesson
    deleteLesson(lessonId: ID!): Lesson
  }
`;

module.exports = typeDefs;
