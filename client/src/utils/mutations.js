import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($fullName: String!, $email: String!, $password: String!, $role: String!) {
    addUser(fullName: $fullName, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($chatText: String!) {
    addChat(chatText: $chatText) {
      _id
      chatText
      chatAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($chatId: ID!, $commentText: String!) {
    addComment(chatId: $chatId, commentText: $commentText) {
      _id
      chatText
      chatAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_LEADER = gql`
  mutation addLeader($leaderName: String!, $leaderBio: String!, $leaderPhone: String!, $leaderEmail: String!, $leaderImage: String!) {
    addLeader(leaderName: $leaderName, leaderBio: $leaderBio, leaderPhone: $leaderPhone, leaderEmail: $leaderEmail, leaderImage: $leaderImage) {
      _id
      leaderName
      leaderBio
      leaderPhone
      leaderEmail
      leaderImage
    }
  }
`;

export const GET_LEADERS = gql`
  query {
    leaders {
      _id
      leaderName
      leaderBio
      leaderPhone
      leaderEmail
      leaderImage
    }
  }
`;