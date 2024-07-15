// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_CHAT, QUERY_ME } from "../utils/queries";

const SingleChat = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { chatId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_CHAT, {

    // pass URL parameter
    variables: { chatId: chatId },
  });
  // console.log("data", data)
  const chat = data?.getSingleChat || {};

  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const currentUser = userData?.me || {};


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {chat.chatAuthor} <br />
        <span style={{ fontSize: "1rem" }}>
          started this chat on {chat.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {chat.chatText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={chat.comments} />
      </div>
      {currentUser.role !== 'Guardian' && (
        <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
          <CommentForm chatId={chat._id} />
        </div>
      )}
    </div>
  );
};

export default SingleChat;
