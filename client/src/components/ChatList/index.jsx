import { Link } from 'react-router-dom';


const ChatList = ({
  chats,
  chatText,
  showChat = true,
  showName = true,
}) => {
  if (!chats.length) {
    return <h3>No chats Yet</h3>;
  }

  return (
    <div>
      {showChat && <h3>{chatText}</h3>}
      {chats &&
        chats.map((chat) => (
          <div key={chat._id} className="card">
               <div className="card-body bg-light p-2">
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/chats/${chat._id}`}
            >
              <h2>{chat.chatText}</h2>
            </Link>
            </div>
            <p className="card-header bg-primary text-light p-2 m-0">
              {showName ? (
                <>
                 <br />
                <span style={{ fontSize: '1rem' }}>
                  {chat.chatAuthor} {chat.createdAt}
                </span>
              </>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                   {chat.createdAt}
                  </span>
                </>
              )}
            </p>
         
          </div>
        ))}
    </div>
  );
};

export default ChatList;
