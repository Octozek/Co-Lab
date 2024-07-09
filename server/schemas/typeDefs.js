const typeDefs = `
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
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
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
