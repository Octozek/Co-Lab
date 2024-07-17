import React, { useState, useEffect } from 'react';
import { send } from '../../websocket';
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";


function ChatRoom() {
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;
  //   const newMessage = { id: Date.now(), text: input };
  //   setMessages([...messages, newMessage]);
  //   send(JSON.stringify(newMessage))
  //   setInput('');
  // };
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const currentUser = userData?.me || {};

  // console.log("messages", messages)
  
  const socket = new WebSocket('ws://localhost:3001/chatroom');
  useEffect(() => {
    // Create WebSocket connection.
    setWs(socket);

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      // console.log("Got message back!", event)
      const newMessage = JSON.parse(event.data)
    setMessages(prevMessages => [...prevMessages, { ...newMessage, id: newMessage.id || Date.now() }]);
  });

    // Clean up WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && inputMessage.trim() !== '') {
      const messageToSend = JSON.stringify({ message: inputMessage, id: Date.now() }); // Assuming the server expects JSON
      socket.send(messageToSend);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>Chatroom</h2>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.message}</p>
        ))}
      </div>
      {currentUser.role !== "Guardian" && (

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
       )}
    </div>
  );
}

export default ChatRoom;