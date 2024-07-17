import { QUERY_NAME, QUERY_CHATS, QUERY_USERS, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./Chat.css";
import ChatForm from "../components/ChatForm";
import UserChat from "../components/UserChat";


const SingleUser = () => {  

const { userId } = useParams();
// We also need the Current User --> From our Auth (QUERY_ME)

// We locatte our friend data by using the useQuery Hook
const { loading: nameLoading, data: nameData } = useQuery(QUERY_NAME, { variables: { _id: userId}});
const { loading: chatsLoading, data: chatsData } = useQuery(QUERY_CHATS);
  const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
// Make a REQUEST for a DIRECT MESSAGE to the user

    // Maybe we get back some TOEKN or DOCUMENT about the conversation
const name = nameData?.getName || {};
const chats = chatsData?.getChats || [];
const users = usersData?.getUsers || [];
const currentUser = userData?.me || {};
// console.log("nameData", nameData)
// console.log("name", name)
// console.log("name.fullName", name.fullName)

    return (
            <div>
              <div>
                <h1>{name.fullName}'s Chatroom</h1>
              </div>
              <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
            </div>
        )
    }  

export default SingleUser;
