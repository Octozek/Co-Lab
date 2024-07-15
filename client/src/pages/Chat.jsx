import { useQuery } from "@apollo/client";
// import Auth from '../utils/auth';
import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatForm from "../components/ChatForm";

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
  console.log("users", users);

  return (
    <main>
      <div className="flex-row justify-center">
        <div id="userListContainer" className="col-12 col-md-6 mb-3">
          <h3>Chat Members</h3>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.fullName}</li>
              ))}
            </ul>
          )}
        </div>
        {currentUser.role !== "Guardian" && (
          <div
            id="chatFormContainer"
            className="col-12 col-md-6 mb-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <ChatForm />
          </div>
        )}

        <div id="chatListContainer" className="col-12 col-md-8 mb-3">
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
