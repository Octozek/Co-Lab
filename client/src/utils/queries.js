import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      fullName
      email
      role
      chats {
        _id
        chatText
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    getUsers {
      _id
      fullName
      email
      role
      chats {
        _id
        chatText
        createdAt
      }
    }
  }
`;

export const QUERY_CHATS = gql`
  query getChats {
    getChats {
      _id
      chatText
      chatAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CHAT = gql`
  query getSingleChat($chatId: ID!) {
    getSingleChat(chatId: $chatId) {
      _id
      chatText
      chatAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      fullName
      email
      role
      chats {
        _id
        chatText
        chatAuthor
        createdAt
      }
    }
  }
`;
