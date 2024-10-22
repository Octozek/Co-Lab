import { useQuery } from "@apollo/client";
// import Auth from '../utils/auth';
import ChatList from "../components/ChatList";
import ChatForm from "../components/ChatForm";
import "./Chat.css";
import { Link } from "react-router-dom";

import { QUERY_CHATS, QUERY_USERS, QUERY_ME } from "../utils/queries";

const Chat = () => {
  // const { userLoading, userData } = useQuery(QUERY_ME);
  // const currentUser = userData?.me || {};
  // console.log("currentUser", userData)

  // const { loading, data } = useQuery(QUERY_CHATS);
  // const chats = data?.getChats || [];
  // console.log("chats", chats)

  const { loading: chatsLoading, data: chatsData } = useQuery(QUERY_CHATS);
  const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const chats = chatsData?.getChats || [];
  const users = usersData?.getUsers || [];
  const currentUser = userData?.me || {};
  // console.log("users", users);

  return (
    <main className='main'
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <div
        id="userListContainer"
        className="mb-3"
      >
        <h3>Chat Members</h3>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <Link to={`/users/${user._id}`}>{user.fullName}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='rightSideChat'>
      {currentUser.role !== "Guardian" && (
          <div
            id="chatFormContainer"
            className="mb-3"
          >
            <ChatForm />
          </div>
        )}

        <div
          id="chatListContainer"
          className="mb-3"
        >
          {chatsLoading ? (
            <div>Loading...</div>
          ) : (
            <ChatList chats={chats} title="Current Chat(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Chat;
