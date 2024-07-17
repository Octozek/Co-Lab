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
    audio: String
    image: String
    createdAt: String
   }

  type Event {
    _id: ID
    name: String
    date: String
    price: Float
    image: String
    link: String
  }

  type Leaders{
  _id: ID
  leaderName: String
  leaderBio: String
  leaderPhone: String
  leaderEmail: String
  leaderImage: String
  }

  type PastEvent {
    _id: ID
    title: String
    date: String
    images: [String]
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
    getLeaders: [Leaders]
    getPastEvents: [PastEvent]

  }

  type Mutation {
    addUser(fullName: String!, email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    addChat(chatText: String!): Chat
    addComment(chatId: ID!, commentText: String!): Chat
    addLeader(leaderName: String!, leaderBio: String!, leaderPhone: String!, leaderEmail: String!, leaderImage: String): Leaders
    removeLeader(_id: ID!): Leaders
    addEvent(name: String!, date: String!, price: Float, image: String!, link: String): Event
    deleteEvent(eventId: ID!): Event
    addLesson(lessonTitle: String!, lessonDetails: String!, lessonAuthor: String!, audio: String, image: String): Lesson
    deleteLesson(lessonId: ID!): Lesson
    addPastEvent(title: String!, date: String!, images: [String]): PastEvent
    deletePastEvent(pastEventId: ID!): PastEvent
    
  }
`;

module.exports = typeDefs;
