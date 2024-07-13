import { useQuery } from '@apollo/client';

import ChatList from '../components/ChatList';
import ChatForm from '../components/ChatForm';

import { QUERY_CHATS, QUERY_ME } from '../utils/queries';

const Chat = () => {

  const { userLoading, userData } = useQuery(QUERY_ME);
  const { loading, data } = useQuery(QUERY_CHATS);
  const currentUser = userData?.me || {};
  const chats = data?.getChats || [];
// console.log("chats", data)
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ChatForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ChatList
              chats={chats}
              title="Current Chat(s)..."
            />
          )}
        </div>


        <div className="col-12 col-md-8 mb-3">
          { currentUser.role === "Leader" ? (
            <div>Leader Page...</div>
          ) : currentUser.role === "Student" ? (
            <div>Student Page</div>
          ) : currentUser.role === "Guardian" ? (
            <div>Guardian Page...</div>
          ) : null }

          {/* { currentUser.role === "Leader" ? (
            <div>Leader Page...</div>
          ) : null }
          { currentUser.role === "Student" ? (
            <div>Student Page</div>    ) : null }
          { currentUser.role === "Guardian" ? (
            <div>Guardian Page...</div>
          ) : null } */}
        </div>
      </div>
    </main>
  );
};

export default Chat;
