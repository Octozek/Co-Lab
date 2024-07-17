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

export const QUERY_NAME = gql`
  query getName($_id: ID!) {
    getName(_id: $_id) {
      _id
      fullName
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
    }
  }
`;


export const QUERY_EVENTS = gql`
  query getEvents {
    getEvents {
      _id
      name
      date
      price
      image
      link
    }
  }
`;

export const QUERY_LEADERS = gql`
  query getLeaders {
    getLeaders {
      _id
      leaderName
      leaderBio
      leaderPhone
      leaderEmail
      leaderImage
    }
  }
`;

export const QUERY_PAST_EVENTS = gql`
  query getPastEvents {
    getPastEvents {
      _id
      title
      date
      images
    }
  }
`;

export const QUERY_LESSONS = gql`
  query getLessons {
    getLessons {
      _id
      lessonTitle
      lessonDetails
      lessonAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    getSingleEvent(eventId: $eventId) {
      _id
      name
      date
      price
      image
      link
    }
  }
`;

export const QUERY_SINGLE_LESSON = gql`
  query getSingleLesson($lessonId: ID!) {
    getSingleLesson(lessonId: $lessonId) {
      _id
      lessonTitle
      lessonDetails
      lessonAuthor
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