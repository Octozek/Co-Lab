import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CHAT } from '../../utils/mutations';
import { QUERY_CHATS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import '../../pages/Chat.css';

const ChatForm = () => {
  const [chatText, setChatText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addChat, { error }] = useMutation
    (ADD_CHAT, {
    refetchQueries: [
      QUERY_CHATS,
      'getChats',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
// console.log(Auth.getProfile().data.fullName)
    try {
      const { data } = await addChat({
        variables: {
          chatText,
          chatAuthor: Auth.getProfile().data.fullName,
        },
      });

      setChatText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'chatText' && value.length <= 280) {
      setChatText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='chatFormMain'>
      <h3>Chat</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="chatText"
                placeholder="Start the chat..."
                value={chatText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Chat
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to chat. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ChatForm;
