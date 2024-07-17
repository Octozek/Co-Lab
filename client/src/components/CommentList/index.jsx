const CommentList = ({ comments = [], chat = []}) => {
 
  return (
    <>
      {chat && chat.length > 0 && (
        <div className="chat-messages">
          {chat.map((message) => (
            <div key={message._id} className="chat-message">
              <p>{message.chatText}</p>
            </div>
          ))}
        </div>
      )}

      {!comments.length ? (
        <h3>No Comments Yet</h3>
      ) : (
        <>
          <h3
            className="p-5 display-inline-block"
            style={{ borderBottom: '1px dotted #1a1a1a' }}
          >
       
          </h3>
          <div className="flex-row my-4">
            {comments.map((comment) => (
              <div key={comment._id} className="col-12 mb-3 pb-3">
                <h3 className="card-body">{comment.commentText}</h3>
                <div className="p-3 bg-dark text-light">
                  <h5 className="card-header">
                    <span style={{ fontSize: '0.825rem' }}>
                      {comment.commentAuthor} {comment.createdAt}
                    </span>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CommentList;
