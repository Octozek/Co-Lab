import { useQuery } from '@apollo/client';

import ChatList from '../components/ChatList';
import ChatForm from '../components/ChatForm';

import { QUERY_CHATS } from '../utils/queries';

const Chat = () => {
  const { loading, data } = useQuery(QUERY_CHATS);
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
      </div>
    </main>
  );
};

export default Chat;
