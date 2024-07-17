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

export const ADD_EVENT = gql`
mutation addEvent($name: String!, $date: String!, $price: Float, $image: String!, $link: String) {
    addEvent(name: $name, date: $date, price: $price, image: $image, link: $link) {
      _id
      name
      date
      price
      image
      link
    }
  }
`;

export const DELETE_EVENT = gql`
mutation deleteEvent($eventId: ID!) {
  deleteEvent(eventId: $eventId) {
    _id
  }
}
`;

export const ADD_LESSON = gql`
mutation addLesson($lessonTitle: String!, $lessonDetails: String!) {
  addLesson(lessonTitle: $lessonTitle, lessonDetails: $lessonDetails) {
    _id
    lessonTitle
    lessonDetails
  }
}
`;

export const DELETE_LESSON = gql`
mutation deleteLesson($lessonId: ID!) {
  deleteLesson(lessonId: $lessonId) {
    _id
  }
}
`;

export const ADD_PAST_EVENT = gql`
mutation addPastEvent($title: String!, $date: String!, $images: [String]) {
  addPastEvent(title: $title, date: $date, images: $images) {
    _id
    title
    date
    images
  }
}
`;

export const DELETE_PAST_EVENT = gql`
mutation deletePastEvent($pastEventId: ID!) {
  deletePastEvent(pastEventId: $pastEventId) {
    _id
  }
}
`;

